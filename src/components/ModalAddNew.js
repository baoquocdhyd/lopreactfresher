import axios from '../services/axios.js'
import { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
const ModalAddNew = (props) => {
	const {show, handleClose } = props
  const [a, setA] = useState({ name: '', job: '' })
  let A = (e, T) => {
    setA({ ...a, [T]: e.target.value })  }
  let B = async (a) => {
    try {
      let b = await axios.post('/api/users', a)
			{console.log('kiểm tra trả về', b) }
      setA({ name: '', job: '' })
			toast.info('Tạo mới thành công!');
			props.handleUpdateTable({id: b.id , last_name: b.name})
    } catch (e) {
			toast.error('Lỗi...');
    }
  }
  return (
<div>
<Modal
	show={show} onHide={handleClose}
	backdrop="static" keyboard={false}
	animation={false}  size="lg" centered 
	>
	<Modal.Header closeButton>
		<Modal.Title>Thêm bệnh nhân</Modal.Title>
	</Modal.Header>
	<Modal.Body>
		<Form>
			<Form.Group className="mb-3" controlId="Input1">
				<Form.Label>Name</Form.Label>
				<Form.Control
					type="text" placeholder="" autoFocus
					onChange={(e) => {A(e, 'name')}}
					value={a.name}
				/>
			</Form.Group>
			<Form.Group className="mb-3" controlId="Input1">
				<Form.Label>Job</Form.Label>
				<Form.Control
					type="text" placeholder=""
					onChange={(e) => {A(e, 'job')}}
					value={a.job} />
			</Form.Group>
		</Form>
	</Modal.Body>
	<Modal.Footer>
		<Button variant="secondary" onClick={handleClose}>
			Close
		</Button>
		<Button
			variant="primary"
			onClick={() => { B(a)
				handleClose() }}>
		Save Changes </Button>
	</Modal.Footer>
</Modal>
</div>
  )
}
export default ModalAddNew
