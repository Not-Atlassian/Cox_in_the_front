import { createContext, useState, useEffect, Dispatch, SetStateAction, ReactNode, useCallback } from 'react';

import api, { getTicketEstimation, deleteTicket, getTest, getTickets, getTicket, putTicketStatus, postTicket, getUsers, getUser, avalabilityUser, getShifts, postShift, getUsersInShift, postAdjustment, putTeamMemberAvailability, getShiftAdjustment, getShiftAdjustmentList, getAvailabilityPerSprint, logIn, getTeamMates, signIn } from '../lib/api';

interface AppContextType {
  data: any;
  setData: Dispatch<SetStateAction<any>>;
  tickets: any[];
  ticket: any;
  storyPoints: number;
  fetchTickets: () => Promise<void>;
  addTicket: (ticket: any) => Promise<void>;
  updateTicketStatus: (ticketId: number, status: string) => Promise<void>;
  removeTicket: (ticketId: number) => Promise<void>;
  getEstimation: (title: string, description: string) => Promise<void>;
  fetchTicket: (ticketId: number) => Promise<void>;
  users: any[];
  user: any;
  fetchUsers: () => Promise<void>;
  fetchUser: (userId: number) => Promise<void>;
  userAvailability: any;
  fetchUserAvailability: (userId: number, sprintId: number) => Promise<void>;
  shifts: any[];
  fetchShifts: () => Promise<void>;
  addShift: (shift: any) => Promise<void>;
  usersInShift: any[];
  fetchUsersInShift: (sprintId: number) => Promise<void>;
  addAdjustment: (sprintId: number, adjustment: any) => void;
  updateAvailability: (userId: number, sprintId: number, availability: any) => Promise<void>;
  shiftAdjustment: any;
  fetchShiftAdjustment: (sprintId: number) => Promise<void>;
  fetchShiftAdjustmentList: (sprintId: number) => Promise<any>;
  adjustments: any[];
  setAdjustments: Dispatch<SetStateAction<any[]>>;
  teamMates: any[];
  setTeamMates: Dispatch<SetStateAction<any[]>>;
  fetchTeamMates: (teamID: number) => Promise<any>;
  LogIn:(userName: string, Password: string) => Promise<any>;
  isAuthenticated: boolean;
  SignIn: (username: string, password: string) => Promise<void>;
  fetchSprintAvailability: (sprintId: number) => Promise<void>;
  availabilities: any[];
}


export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //------------------- 1. Tiket API -------------------

  const [data, setData] = useState<any>(null);
  const [tickets, setTickets] = useState<any[]>([]);
  const [ticket, setTicket] = useState<any>(null);
  const [storyPoints, setStoryPoints] = useState<number>(0);

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

  const fetchTicket = useCallback(async (ticketId: number) => {
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

  const getEstimation = async (title: string, description: string) => {
    try {
      const response = await getTicketEstimation(title, description);
      const data = await response.data;
      setStoryPoints(data);
    } catch (error) {
      console.error('Error fetching ticket estimation:', error);
    }
  }

  // ------------------- 2. User Api -------------------

  const [users, setUsers] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [teamMates, setTeamMates] = useState<any[]>([]);

  const fetchUsers = useCallback(async () => {
    try {
      const result = await getUsers();
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

  const LogIn = async (userName: string, Password: string) => {
    try {
      const result = await logIn(userName, Password)
      setCurrentUser(result.data);
      setIsAuthenticated(true);
    } catch (error) {
      throw error;
    }
  };


  const fetchTeamMates = useCallback(async (teamID:number) =>{
    try{
      const result = await getTeamMates(teamID);
      setTeamMates(result.data);

    }catch{
      console.error('Error');
    }
  }, []);

  const SignIn = async (userName: string, Password: string) => {
    try {
      const result = await signIn(userName, Password)
    } catch (error) {
      throw error;
    }
  };


  // ------------------- 3. User Availability Api -------------------
  const [userAvailability, setUserAvailability] = useState<any>(null);
  const [shifts, setShifts] = useState<any[]>([]);
  const [usersInShift, setUsersInShift] = useState<any[]>([]);
  const [shiftAdjustment, setShiftAdjustment] = useState<any[]>([]);
  const [adjustments, setAdjustments] = useState<any[]>([]);

  const fetchUserAvailability = useCallback(async (userId: number, sprintId: number) => {
    try {
      const result = await avalabilityUser(userId, sprintId);
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

  const addAdjustment = (sprintId: number, adjustment: any) => {
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

  const fetchShiftAdjustment = useCallback(async (sprintId: number) => {
    try {
      const result = await getShiftAdjustment(sprintId);
      setShiftAdjustment(result.data);
      return result.data;
    } catch (error) {
      console.error('Error fetching shift adjustment:', error);
    }
  }, []);

  const fetchShiftAdjustmentList = useCallback(async (sprintId: number) => {
    try {
      const result = await getShiftAdjustmentList(sprintId);
      setAdjustments(result.data);
      return result.data;
    } catch (error) {
      console.error('Error fetching shift adjustment:', error);
    }
  }, []);

  // ------------------- 4. Backlog -------------------
  const [availabilities, setAvailabilities] = useState<any>([])

  const addShift = async (shift: any) => {
    try {
      await postShift(shift);
      await fetchShifts();
    } catch (error) {
      console.error('Error adding shift:', error);
    }
  }

  const fetchSprintAvailability = useCallback(async () => {
    try {
      const result = await getAvailabilityPerSprint();
      setAvailabilities(result.data);
      console.log("Availabilities", result.data);
    } catch (error) {
      console.error('Error fetching ticket:', error);
    }
  }, []);

  useEffect(() => {
    fetchSprintAvailability();
  }, [fetchSprintAvailability]);

  useEffect(() => {
    fetchSprintAvailability();
  }, []);
  

  
  


  return (
    <AppContext.Provider value={{
      data,
      setData,
      tickets,
      fetchTickets,
      updateTicketStatus,
      removeTicket,
      getEstimation,
      fetchTicket,
      ticket,
      storyPoints,
      addTicket,
      users,
      fetchUsers,
      user,
      fetchUser,
      userAvailability,
      fetchUserAvailability,
      shifts,
      fetchShifts,
      addShift,
      usersInShift,
      fetchUsersInShift,
      addAdjustment,
      updateAvailability,
      shiftAdjustment,
      fetchShiftAdjustment,
      fetchShiftAdjustmentList,
      adjustments,
      setAdjustments,
      fetchTeamMates,
      teamMates,
      setTeamMates,
      isAuthenticated,
      LogIn,
      SignIn,
      availabilities,
      fetchSprintAvailability,
    }}>
      {children}
    </AppContext.Provider>
  );
};