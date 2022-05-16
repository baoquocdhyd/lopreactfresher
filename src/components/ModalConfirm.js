import { Modal, Button, Form } from 'react-bootstrap'
import axios from '../services/axios.js'

const ModalConfirm = (props) => {
  const { show, handleconFirmClose, C, idForDelete, handleDelete } = props
  

  // let Delete = async () => {
  //   try {
  //     // const res = await axios.delete(`/api/users/${idForDelete.id}`)
  //     console.log('id xóa',idForDelete.id)
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }
  return (
    <div>
      <Modal
        show={show}
        onHide={handleconFirmClose}
        backdrop="static"
        keyboard={false}
        animation={false}
        size="lg"
        centered>
        <Modal.Header closeButton>
          <Modal.Title>Bạn có đồng ý xóa không?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            Chọn confirrm nếu muốn xóa email
            <h5>{idForDelete.email}</h5>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleconFirmClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              C()
              handleconFirmClose()
							handleDelete()
            }}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
export default ModalConfirm
