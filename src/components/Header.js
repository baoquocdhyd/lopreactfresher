import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { Routes, Route, Link, useLocation, NavLink, useNavigate } from 'react-router-dom'

import img from '../assets/image/logo192.png'
const Header = (props) => {
  const navigate = useNavigate()

  return (
  <>
    <Navbar bg="light" expand="sm" style={{ color: 'red !important,' }}>
    <Container>
    <Navbar.Brand href="/">
      <img src={img} style={{ height: '30px', width: '30px', display: 'inline block' }}></img>
      Bootstrap
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
        <NavLink to="/user" className="nav-link">
          Manage Users
        </NavLink>
      </Nav>
      <Nav>
        <NavDropdown title="Setting" id="basic-nav-dropdown" style={{ float: 'right' }}>
          <NavLink to="/login" className="dropdown-item">
            Login
          </NavLink>
          <NavDropdown.Item className="dropdown-item"
            onClick = {() => {localStorage.removeItem('token')
            navigate('/user')
            } }>
            Logout
          </NavDropdown.Item>

          <NavDropdown.Divider />
          <NavDropdown.Item href=""  className="dropdown-item">Separated link</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
    </Container>
    </Navbar>
  </>
  )
}
export default Header
