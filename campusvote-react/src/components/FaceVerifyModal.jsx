// Popup that checks the student's face before they can vote.
//
// The popup has 4 steps, stored in the "step" state:
//   'ask'  -> explains and has an "Open camera" button
//   'scan' -> camera is on, scanning
//   'ok'   -> face matched, "Continue" button
//   'fail' -> face did not match, "Try again" button
//
// Props: onSuccess (called when the student presses Continue), onCancel
import { useState, useRef, useEffect } from 'react';
import Icon from './Icon.jsx';
import { verifyFace } from '../api.js';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function FaceVerifyModal({ onSuccess, onCancel }) {
  const [step, setStep] = useState('ask');
  const [statusText, setStatusText] = useState('Starting...');
  const [hasCamera, setHasCamera] = useState(false);
  const [confidence, setConfidence] = useState('');

  // useRef keeps a value between renders without causing a re-render.
  const videoRef = useRef(null);  // the <video> element
  const streamRef = useRef(null); // the camera stream

  function stopCamera() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  }

  // Runs when the popup closes: make sure the camera is switched off.
  useEffect(() => {
    return () => stopCamera();
  }, []);

  // Once the <video> element exists, connect the camera stream to it.
  useEffect(() => {
    if (hasCamera && videoRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [hasCamera, step]);

  // Take a picture from the video and return it as text (base64).
  function takePhoto() {
    const video = videoRef.current;
    if (!video || !video.videoWidth) return '';
    const canvas = document.createElement('canvas');
    canvas.width = 320;
    canvas.height = 240;
    canvas.getContext('2d').drawImage(video, 0, 0, 320, 240);
    return canvas.toDataURL('image/jpeg', 0.7);
  }

  async function startScan() {
    setStep('scan');
    setStatusText('Starting...');

    try {
      streamRef.current = await navigator.mediaDevices.getUserMedia({ video: true });
      setHasCamera(true);
    } catch (error) {
      setHasCamera(false); // no camera or permission denied: we run a demo scan
    }

    setStatusText('Detecting face...');
    await wait(1000);
    setStatusText('Checking liveness...');
    await wait(1000);
    setStatusText('Matching with your student record...');
    await wait(1200);

    const photo = takePhoto();
    stopCamera();

    const result = await verifyFace(photo); // asks the backend (or demo) if the face matches
    setConfidence(result.confidence || '');
    setStep(result.match ? 'ok' : 'fail');
  }

  return (
    <div className="modal">
      <div className="sheet">
        {step === 'ask' && (
          <>
            <div className="av" style={{ margin: '0 auto 12px', width: 64, height: 64, borderRadius: 20 }}>
              <Icon name="camera" />
            </div>
            <h1 style={{ fontSize: 22 }}>Verify it's you</h1>
            <p className="mut" style={{ margin: '8px 0 18px' }}>
              Before you vote, look at the camera. We match your face with your student record.
            </p>
            <button className="btn" onClick={startScan}>Open camera</button>
            <button className="btn ghost" style={{ marginTop: 10 }} onClick={onCancel}>Cancel</button>
          </>
        )}

        {step === 'scan' && (
          <>
            <h1 style={{ fontSize: 22 }}>Scanning your face</h1>
            <div className="cam">
              {hasCamera ? <video ref={videoRef} autoPlay muted playsInline /> : <Icon name="user" />}
            </div>
            <div style={{ fontWeight: 700 }}>{statusText}</div>
            {!hasCamera && (
              <p className="mut" style={{ fontSize: 12, marginTop: 8 }}>
                Camera is not available, so this is a demo scan.
              </p>
            )}
            <button className="btn ghost" style={{ marginTop: 14 }} onClick={onCancel}>Cancel</button>
          </>
        )}

        {step === 'ok' && (
          <>
            <div className="ok" style={{ margin: '6px auto 14px', width: 84, height: 84 }}>
              <Icon name="check" />
            </div>
            <h1 style={{ fontSize: 22 }}>Face matched</h1>
            <p className="mut" style={{ margin: '8px 0 18px' }}>
              {confidence && confidence + '% match. '}You can now vote.
            </p>
            <button className="btn" onClick={onSuccess}>Continue to ballot</button>
          </>
        )}

        {step === 'fail' && (
          <>
            <h1 style={{ fontSize: 22 }}>Face not matched</h1>
            <p className="mut" style={{ margin: '8px 0 18px' }}>
              We could not confirm your identity. Try again in good light.
            </p>
            <button className="btn" onClick={() => setStep('ask')}>Try again</button>
            <button className="btn ghost" style={{ marginTop: 10 }} onClick={onCancel}>Cancel</button>
          </>
        )}
      </div>
    </div>
  );
}
