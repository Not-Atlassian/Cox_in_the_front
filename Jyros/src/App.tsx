import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import BacklogPage from './pages/BacklogPage';
import TicketView from './ticketPopup/TicketView';
import TicketCreate from './ticketPopup/TicketCreate';
import Board from './components/Board/Board';
import Availability from './components/AvailabiltyPage/Availability';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/board" />} />
          <Route path="/board" element={<Board />} />
          <Route path="/backlog" element={<BacklogPage />} />
          <Route path="/availability" element={<Availability/>} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;