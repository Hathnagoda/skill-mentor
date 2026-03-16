const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1'

export async function fetchMentors() {
  const response = await fetch(`${API_BASE_URL}/mentors`)

  if (!response.ok) {
    throw new Error('Failed to fetch mentors')
  }

  return response.json()
}

export async function fetchMentorById(id: string) {
  const response = await fetch(`${API_BASE_URL}/mentors/${id}`)

  if (!response.ok) {
    throw new Error('Failed to fetch mentor details')
  }

  return response.json()
}

export async function fetchSubjectsByMentorId(id: string) {
  const response = await fetch(`${API_BASE_URL}/mentors/${id}/subjects`)

  if (!response.ok) {
    throw new Error('Failed to fetch mentor subjects')
  }

  return response.json()
}

export async function createSession(sessionData: {
  studentName: string
  sessionDateTime: string
  durationMinutes: number
  mentorId: number
  subjectId: number
}) {
  const response = await fetch(`${API_BASE_URL}/sessions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(sessionData),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Failed to create session')
  }

  return data
}

export async function fetchSessionsByStudentName(studentName: string) {
  const response = await fetch(`${API_BASE_URL}/sessions/student/${studentName}`)

  if (!response.ok) {
    throw new Error('Failed to fetch student sessions')
  }

  return response.json()
}

export async function fetchAllSessions() {
  const response = await fetch(`${API_BASE_URL}/sessions`)

  if (!response.ok) {
    throw new Error('Failed to fetch sessions')
  }

  return response.json()
}

export async function fetchSessionsByStatus(status: string) {
  const response = await fetch(`${API_BASE_URL}/sessions/status/${status}`)

  if (!response.ok) {
    throw new Error('Failed to fetch sessions by status')
  }

  return response.json()
}

export async function fetchSessionsByPaymentStatus(paymentStatus: string) {
  const response = await fetch(`${API_BASE_URL}/sessions/payment-status/${paymentStatus}`)

  if (!response.ok) {
    throw new Error('Failed to fetch sessions by payment status')
  }

  return response.json()
}

export async function confirmPayment(sessionId: number) {
  const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}/confirm-payment`, {
    method: 'PATCH',
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Failed to confirm payment')
  }

  return data
}

export async function confirmSession(sessionId: number) {
  const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}/confirm-session`, {
    method: 'PATCH',
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Failed to confirm session')
  }

  return data
}

export async function completeSession(sessionId: number) {
  const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}/complete-session`, {
    method: 'PATCH',
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Failed to complete session')
  }

  return data
}

export async function updateMeetingLink(sessionId: number, meetingLink: string) {
  const response = await fetch(
    `${API_BASE_URL}/sessions/${sessionId}/meeting-link?meetingLink=${encodeURIComponent(meetingLink)}`,
    {
      method: 'PATCH',
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Failed to update meeting link')
  }

  return data
}
export async function cancelSession(sessionId: number) {
  const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}/cancel`, {
    method: 'PATCH',
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Failed to cancel session')
  }

  return data
}