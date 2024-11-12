import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Board from './components/board'
import CVBasicHomePageNuDaPushLaAsta from './components/cvBasicHomePage'
import './App.css'
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar'

const App = () => {

  return (
    <>
    <SidebarProvider>
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CVBasicHomePageNuDaPushLaAsta />} />
          <Route path="/board" element={<Board />} />
        </Routes>
      </BrowserRouter>
      </SidebarProvider>
    </>
  )
}

export default App
