import Header from './components/Header.js'
import Home from './components/Home.js'
import TableUsers from './components/TableUsers.js'
import Login from './components/Login.js'
import Container from 'react-bootstrap/Container'
import { ToastContainer, toast } from 'react-toastify'
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'

import './App.scss'

function App() {
  return (
    <div className="app-container">
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<TableUsers />} />
          <Route path="/login" element={<Login />} />

        </Routes>
      </Container>

      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}

export default App
