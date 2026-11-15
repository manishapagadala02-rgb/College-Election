// All data goes through this file. Components never call fetch() directly.
//
//   DEMO_MODE = true   -> uses sampleData.js in memory. No backend needed.
//   DEMO_MODE = false  -> talks to the Node/Express backend (npm run dev in the backend folder).

import { sampleElections, sampleVoters, sampleVotedIds } from './sampleData.js';

const DEMO_MODE = true;

// ----- demo "database" (lives in memory, resets when you refresh the page) -----
let demoElections = sampleElections.map((e) => ({ ...e, candidates: e.candidates.map((c) => ({ ...c })) }));
let demoVoters = [...sampleVoters];
let demoVotedIds = [...sampleVotedIds];

// ----- helpers for the real backend -----
let token = null; // the login token we get from the server

async function request(path, method = 'GET', body) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = 'Bearer ' + token;

  const response = await fetch('/api' + path, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    let message = 'Something went wrong';
    try {
      message = (await response.json()).message || message;
    } catch (error) {
      // the server did not send JSON, keep the default message
    }
    throw new Error(message);
  }
  if (response.status === 204) return null; // 204 = success with no content
  return response.json();
}

// The backend uses short names (t, pos, c...). We rename them so our components read clearly.
function cleanElection(e) {
  return {
    id: e.id,
    title: e.t,
    position: e.pos,
    deadline: e.dl,
    open: e.open,
    candidates: e.c.map((c) => ({ id: c.id, name: c.n, votes: c.v })),
  };
}

function cleanVoter(v) {
  return { pk: v.pk, name: v.n, studentId: v.id, faceEnrolled: v.f };
}

// ================= functions the app uses =================

export async function login(id, password, role) {
  if (DEMO_MODE) {
    if (!id || !password) throw new Error('Enter your ID and password');
    return { role, name: role === 'admin' ? 'Admin' : 'Alexander' };
  }
  const data = await request('/auth/login', 'POST', { id, password, role });
  token = data.token;
  return { role: data.role, name: data.name };
}

export async function getElections() {
  if (DEMO_MODE) return demoElections.map((e) => ({ ...e })); // copies, so React notices the change
  const list = await request('/elections');
  return list.map(cleanElection);
}

export async function getVotedIds() {
  if (DEMO_MODE) return [...demoVotedIds];
  return request('/me/voted');
}

export async function verifyFace(image) {
  if (DEMO_MODE) return { match: true, confidence: '98.4' };
  return request('/face/verify', 'POST', { image });
}

export async function castVote(electionId, candidateId) {
  if (DEMO_MODE) {
    const election = demoElections.find((e) => e.id === electionId);
    const candidate = election.candidates.find((c) => c.id === candidateId);
    candidate.votes += 1;
    demoVotedIds.push(electionId);
    return { receipt: 'CV-' + Math.random().toString(36).slice(2, 8).toUpperCase() };
  }
  return request('/elections/' + electionId + '/vote', 'POST', { candidateId });
}

// ----- admin -----

export async function createElection(data) {
  if (DEMO_MODE) {
    const newId = demoElections.length ? Math.max(...demoElections.map((e) => e.id)) + 1 : 1;
    const candidates = [...data.candidates, 'NOTA'].map((name, i) => ({ id: Date.now() + i, name, votes: 0 }));
    demoElections.unshift({
      id: newId, title: data.title, position: data.position || 'Position',
      deadline: data.endDate || 'TBA', open: true, candidates,
    });
    return;
  }
  await request('/admin/elections', 'POST', {
    title: data.title, position: data.position, academicYear: data.academicYear,
    startDate: data.startDate || null, endDate: data.endDate || null,
    description: data.description, candidates: data.candidates,
  });
}

export async function toggleElection(id) {
  if (DEMO_MODE) {
    const election = demoElections.find((e) => e.id === id);
    election.open = !election.open;
    election.deadline = election.open ? 'TBA' : 'Closed';
    return;
  }
  await request('/admin/elections/' + id + '/toggle', 'POST');
}

export async function getVoters() {
  if (DEMO_MODE) return [...demoVoters];
  const list = await request('/admin/voters');
  return list.map(cleanVoter);
}

export async function addVoter(name) {
  if (DEMO_MODE) {
    demoVoters.push({ pk: Date.now(), name, studentId: 'S' + (1001 + demoVoters.length), faceEnrolled: false });
    return;
  }
  await request('/admin/voters', 'POST', { name });
}

export async function deleteVoter(pk) {
  if (DEMO_MODE) {
    demoVoters = demoVoters.filter((v) => v.pk !== pk);
    return;
  }
  await request('/admin/voters/' + pk, 'DELETE');
}
