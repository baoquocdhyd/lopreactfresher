import { useState, useEffect } from 'react'
import { Table, Button, Form, Row, Col, Container } from 'react-bootstrap'
import { Routes, Route, Link, useLocation, NavLink, useNavigate } from 'react-router-dom'
import axios from '../services/axios.js'

const Login = () => {
  const [a, setA] = useState()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('token')) {navigate('/user')}
  }, [])

  const loginApi = (email, password) => {
    return axios.post('/api/login', { email, password })
  }
  return (
    <Container fluid>
      <Col style={{ margin: '0 auto' }} xs="12" sm="9" md="6" lg="5">
        <h3>Login   eve.holt@reqres.in</h3>
        <Form.Group className="mb-3">
          <Form.Label className="mx-3">Email</Form.Label>
          <Form.Control
            type="text"
            // className="col-4"
            placeholder=""
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            // style={{ width: '300px', display: 'inline-block' }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="mx-3" column="md" lg={2}>
            Password
          </Form.Label>
          <Form.Control
            type="password"
            placeholder=""
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            // style={{ width: '300px', display: 'inline-block' }}
          />
        </Form.Group>
        <Button
          variant="primary"
          size="sm"
          onClick={async () => {
            let res = await axios.post('/api/login', {
              email: email,
              password: password,
            })
            navigate('/user')
            if (res) {
              localStorage.setItem('token', res.token)
            }
            console.log('token', res.token)
            // eve.holt@reqres.in
            console.log('res', email + password)
          }}
          className="mb-2 center"
          style={{ float: 'right' }}>
          Login
        </Button>
        <br />
        &nbsp; &nbsp; &nbsp; &nbsp;
        <NavLink to="/">Back</NavLink>
      </Col>
    </Container>
  )
}

export default Login
