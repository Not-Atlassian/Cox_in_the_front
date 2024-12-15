import React, { createContext, useState, useEffect, Dispatch, SetStateAction, ReactNode, useCallback } from 'react';
import { deleteTicket, getTest, getTickets, getTicket, putTicketStatus, postTicket } from '../lib/api';

interface AppContextType {
  data: any;
  setData: Dispatch<SetStateAction<any>>;
  tickets: any[];
  ticket: any;
  fetchTickets: () => Promise<void>;
  addTicket: (ticket: any) => Promise<void>;
  updateTicketStatus: (ticketId: number, status: string) => Promise<void>;
  removeTicket: (ticketId: number) => Promise<void>;
  fetchTicket: (ticketId: number) => Promise<void>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<any>(null);
  const [tickets, setTickets] = useState<any[]>([]);
  const [ticket, setTicket] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getTest();
        setData(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const addTicket = async (ticket: any) => {
    try {
      await postTicket(ticket);
      await fetchTickets();
    } catch (error) {
      console.error('Error adding ticket:', error);
    }
  }

  const fetchTickets = useCallback(async () => {
    try {
      const result = await getTickets();
      console.log('Fetched tickets:', result.data); // Debug log
      setTickets(result.data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  }, []);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTicket =useCallback( async (ticketId: number) => {
    try {
      const result = await getTicket(ticketId);
      setTicket(result.data);
    } catch (error) {
      console.error('Error fetching ticket:', error);
    }
  }, []);

  const updateTicketStatus = async (ticketId: number, status: string) => {
    try {
      await putTicketStatus(ticketId, status);
      await fetchTicket(ticketId);
      await fetchTickets();
    } catch (error) {
      console.error('Error updating ticket:', error);
    }
  }

  const removeTicket = async (ticketId: number) => {  
    try {
      await deleteTicket(ticketId);
      await fetchTickets();
    } catch (error) {
      console.error('Error deleting ticket:', error);
    }
  }



  return (
    <AppContext.Provider value={{ data, setData, tickets, fetchTickets, updateTicketStatus, removeTicket, fetchTicket, ticket, addTicket }}>
      {children}
    </AppContext.Provider>
  );
};