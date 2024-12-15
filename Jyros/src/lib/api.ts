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

export default api;