import { Modal, Button } from 'react-bootstrap'

const ModalConfirm = (props) => {
const { show, handleconFirmClose, C, idForDelete, handleDelete } = props

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
