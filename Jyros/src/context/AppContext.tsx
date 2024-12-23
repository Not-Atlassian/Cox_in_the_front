import { createContext, useState, useEffect, Dispatch, SetStateAction, ReactNode, useCallback } from 'react';
import { deleteTicket, getTest, getTickets, getTicket, putTicketStatus, postTicket, getUsers, getUser,avalabilityUser, getShifts, getUsersInShift, postAdjustment, putTeamMemberAvailability } from '../lib/api';

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
  users: any[];
  user: any;
  fetchUsers: () => Promise<void>;
  fetchUser: (userId: number) => Promise<void>;
  userAvailability: any;
  fetchUserAvailability: (userId: number, sprintId: number) => Promise<void>;
  shifts: any[];
  fetchShifts: () => Promise<void>;
  usersInShift: any[];
  fetchUsersInShift: (sprintId: number) => Promise<void>;
  addAdjustment: (sprintId:number ,adjustment: any) => void;
  updateAvailability: (userId: number, sprintId: number, availability: any) => Promise<void>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {

//------------------- 1. Tiket API -------------------

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

  // ------------------- 2. User Api -------------------

  const [users, setUsers] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  
  const fetchUsers = useCallback(async () => {
    try {
      const result = await getUsers();
      console.log('Fetched users:', result.data); // Debug log
      setUsers(result.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }, []);
  
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  
  useEffect(() => {
    fetchUsers();
  }, []);
  
  const fetchUser = useCallback(async (userId: number) => {
    try {
      const result = await getUser(userId);
      setUser(result.data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }, []);
  
  // ------------------- 3. User Availability Api -------------------
  const [userAvailability, setUserAvailability] = useState<any>(null);
  const [shifts, setShifts] = useState<any[]>([]);
  const [usersInShift, setUsersInShift] = useState<any[]>([]);
  
  const fetchUserAvailability = useCallback(async (userId: number, sprintId: number) => {
    try {
      const result = await avalabilityUser(userId,sprintId);
      setUserAvailability(result.data);
      return result.data;
    } catch (error) {
      console.error('Error fetching user availability:', error);
    }
  }, []);

  const fetchShifts = useCallback(async () => {
    try {
      const result = await getShifts();
      setShifts(result.data);
      console.log('Fetched shifts:', result.data); // Debug log
    } catch (error) {
      console.error('Error fetching shifts:', error);
    }
  }, []);

  const fetchUsersInShift = useCallback(async (sprintId: number) => {
    try {
      setUsersInShift([]);
      const result = await getUsersInShift(sprintId);
      setUsersInShift(result.data);
    } catch (error) {
      console.error('Error fetching users in shift:', error);
    }
  }, []);

  const addAdjustment = (sprintId:number ,adjustment: any) => {
    try {
      postAdjustment(sprintId, adjustment);
    } catch (error) {
      console.error('Error adding adjustment:', error);
    }
  }

  const updateAvailability = async (userId: number, sprintId: number, availability: any) => {
    try {
      await putTeamMemberAvailability(userId, sprintId, availability);
      await fetchUserAvailability(userId, sprintId);
    } catch (error) {
      console.error('Error updating availability:', error);
    }
  }

  


  return (
    <AppContext.Provider value={{
      data, 
      setData,
      tickets,
      fetchTickets,
      updateTicketStatus,
      removeTicket,
      fetchTicket,
      ticket,
      addTicket,
      users,
      fetchUsers,
      user,
      fetchUser,
      userAvailability,
      fetchUserAvailability,
      shifts,
      fetchShifts,
      usersInShift,
      fetchUsersInShift,
      addAdjustment,
      updateAvailability
    }}>
      {children}
    </AppContext.Provider>
  );
};