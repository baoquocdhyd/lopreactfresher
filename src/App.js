import './App.scss'
import Header from './components/Header.js'
import TableUsers from './components/TableUsers.js'
import Container from 'react-bootstrap/Container'
import { ToastContainer, toast } from 'react-toastify'

function App() {
 
  return (
    <div className="app-container">
      <h1>Hello word</h1>
      <Header />
      <Container>
        
        <TableUsers />
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
