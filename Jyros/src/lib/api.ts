import axios from 'axios';
import exp from 'constants';

const api = axios.create({
  baseURL: 'https://localhost:7048', // Ensure this is the correct base URL for your backend
  withCredentials: true,
});

export const getTest = async () => {
  try {
    const response = await api.get('/test'); // Replace '/test' with your actual endpoint
    return response;
  } catch (error) {
    console.error('Error fetching test data:', error);
    throw error;
  }
};




// --------------------------- Ticket API ---------------------------




export const postTicket = async (data: any) => {
  try {
    const response = await api.post('/api/Ticket', data); // Replace '/test' with your actual endpoint
    return response;
  } catch (error) {
    console.error('Error posting test data:', error);
    throw error;
  }
}

export const getTickets = async () => {
  try {
    const response = await api.get('/api/Ticket'); // Replace '/api/Ticket' with your actual endpoint
    return response;
  } catch (error) {
    console.error('Error fetching ticket data:', error);
    throw error;
  }
}

export const getTicket = async (ticketId: number) => {
  try {
    const response = await api.get(`/api/Ticket/${ticketId}`); // Replace '/api/Ticket' with your actual endpoint
    return response;
  } catch (error) {
    console.error('Error fetching ticket data:', error);
    throw error;
  }
}

export const putTicketStatus = async (ticketId: number, status: string) => {
  try {
    const response = await api.put(`/api/Ticket/${ticketId}/status`, { status }); // Replace '/api/Ticket' with your actual endpoint
    return response;
  } catch (error) {
    console.error('Error updating ticket:', error);
    throw error;
  }
}

export const deleteTicket = async (ticketId: number) => {
  try {
    const response = await api.delete(`/api/Ticket/${ticketId}`); // Replace '/api/Ticket' with your actual endpoint
    return response;
  } catch (error) {
    console.error('Error deleting ticket:', error);
    throw error;
  }
}


// --------------------------- User API ---------------------------

export const getUsers = async () => {
  try {
    const response = await api.get('/api/User'); // Replace '/api/User' with your actual endpoint
    console.log("Users", response);
    return response;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

export const getUser = async (userId: number) => {
  try {
    const response = await api.get(`/api/User/${userId}`); // Replace '/api/User' with your actual endpoint
    return response;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

// --------------------------- Shift Availability API ---------------------------

export const avalabilityUser = async (userId: number, sprintId: number) => {
  try {
    const response = await api.get(`/api/ShiftAvailability/${sprintId}/${userId}`); // Replace '/api/User' with your actual endpoint
    return response;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

export const getShifts = async () => {
  try {
    const response = await api.get('/api/ShiftAvailability/sprints'); // Replace '/api/User' with your actual endpoint
    console.log("Shifts", response);
    return response;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

export const getUsersInShift = async (sprintId: number) => {
  try {
    const response = await api.get(`/api/ShiftAvailability/sprints/${sprintId}/users`); // Replace '/api/User' with your actual endpoint
    return response;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

export const postAdjustment = async (sprintId: number,  data: any) => {
  try {
    const response = await api.post(`/api/ShiftAvailability/${sprintId}/adjustment`, data); // Replace '/api/User' with your actual endpoint
    return response;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

export const putTeamMemberAvailability = async (userId: number,sprintId: number , data: any) => {
  try {
    const response = await api.put(`/api/ShiftAvailability/${sprintId}/${userId}`, data); // Replace '/api/User' with your actual endpoint
    return response;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}




export default api;