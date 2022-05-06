import './App.scss'
import Header from './components/Header.js'
import TableUsers from './components/TableUsers.js'
import Container from 'react-bootstrap/Container'
import C1 from './components/C1.js' 
function App() {
  return (
    <div className="app-container">
      <h1>Hello word</h1>
      <Header />
      <Container>
        {/* <TableUsers /> */}
      </Container>
        <C1/>
    </div>
  )
}

export default App
