import './App.scss'
import Header from './components/Header.js'
import TableUsers from './components/TableUsers.js'
import Container from 'react-bootstrap/Container'

function App() {
  return (
    <div className="app-container">
      <h1>Hello word</h1>
      <Header />
      <Container>
        <TableUsers />
      </Container>
    </div>
  )
}

export default App
