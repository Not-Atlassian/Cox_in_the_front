import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import BacklogPage from './pages/BacklogPage';
import TicketView from './ticketPopup/TicketView';
import TicketCreate from './ticketPopup/TicketCreate';
import Board from './components/Board/Board';
import Availability from './components/AvailabiltyPage/Availability';
import LoginPage from './assets/user/LoginPage';
import PrivateRoute from '@/assets/user/PrivatRoute'

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Navigate to="/board" />} />
          <Route 
            path="/board" 
            element={
              <PrivateRoute>
                <Board />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/backlog" 
            element={
              <PrivateRoute>
                <BacklogPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/availability" 
            element={
              <PrivateRoute>
                <Availability />
              </PrivateRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;