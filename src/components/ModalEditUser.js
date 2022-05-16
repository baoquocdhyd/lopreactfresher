import axios from '../services/axios.js'
import { useState, useLayoutEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
const ModalEditUser = (props) => {
	const {show, dataUserEdit, handleEditClose, handleUpdateEditTable } = props
  const [a, setA] = useState({ id: '', email: '', first_name: '', last_name: '' })
  let A = (e, T) => {
    setA({ ...a, [T]: e.target.value })
  }
  let B = async (a) => {
    try {
      let b = await axios.put(`/api/users/${a.id} `)
      {
        // console.log('kiểm tra trả về từ API', b)
      }
      setA({ id: '', email: '', first_name: '', last_name: '' })
      toast.info('Cập nhật thành công!')
			props.handleUpdateEditTable(a)


    } catch (e) {
      toast.error('Lỗi...')
    }
  }
  useLayoutEffect(() => {
    setA({
      id: dataUserEdit.id,
      email: dataUserEdit.email,
      first_name: dataUserEdit.first_name,
      last_name: dataUserEdit.last_name,
    })
  }, [dataUserEdit])
  // console.log(a)

  return (
    <div>
      <Modal
        show={show}
        onHide={handleEditClose}
        backdrop="static"
        keyboard={false}
        animation={false}
        size="lg"
        centered>
        <Modal.Header closeButton>
          <Modal.Title>Sửa thông tin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="Input1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                autoFocus
                onChange={(e) => {
                  A(e, 'email')
                }}
                value={a.email}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Input1">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                onChange={(e) => {
                  A(e, 'first_name')
                }}
                value={a.first_name}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Input1">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                onChange={(e) => {
                  A(e, 'last_name')
                }}
                value={a.last_name}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              B(a)
							handleUpdateEditTable(a)
              props.handleEditClose()
            }}>
            Update{' '}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
export default ModalEditUser
