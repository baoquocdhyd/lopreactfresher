import ModalAddNew from './ModalAddNew.js'
import ModalEditUser from './ModalEditUser.js'
import ModalConfirm from './ModalConfirm.js'
import axios from '../services/axios.js'
import { useState, useLayoutEffect } from 'react'
import ReactPaginate from 'react-paginate'
import { Table, Button } from 'react-bootstrap'
import _ from 'lodash'
import { toast } from 'react-toastify'

const TableUsers = (props) => {
  const [a, setA] = useState([])
  const [b, setB] = useState(0) //tổng số mẫu lấy về trong trang
  const [totalPape, setTotalPape] = useState(0) //tổng số trang
  const Fi = async (page) => {
    let res = await axios.get(`/api/users?page=${page}`)
    if (res && res.data) {
      setA(res.data)
      setB(res.total)
      setTotalPape(res.total_pages)
    }
  }
  useLayoutEffect(() => {
    Fi(1)
  }, [])
  const handlePageClick = (e) => {
    Fi(+e.selected + 1)
  }
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false)
  const handleClose = () => {
    setIsShowModalAddNew(false)
  }
  const handleUpdateTable = (user) => {
    setA([user, ...a])
  }
  const [isShowModalEditUser, setIsShowModalEditUser] = useState(false)
  const [dataUserEdit, setDataUserEdit] = useState({})
  const handleEditClose = () => {
    setIsShowModalEditUser(false)
  }
  const handleUpdateEditTable = (user) => {
    let i = a.findIndex((a) => {
      return a.id === user.id
    })
    let b = _.cloneDeep(a)
    b[i].email = user.email
    b[i].first_name = user.first_name
    b[i].last_name = user.last_name
    setA(b)
  }
  let C = async () => {
    try {
      const res = await axios.delete(`/api/users/${idForDelete.id}`)
      console.log('id đã xóa',idForDelete.id)
      console.log('trả về', res) 

    } catch (e) {
      console.log(e)
    }
  }
  const handleDelete = () => {
    const b = a.filter((a,b) => {return a.id !== idForDelete.id} ) 
    setA(b)
  }
  // let C =  () => {  }

  const [isShowModalConfirm, setIsShowModaConfirm] = useState(false)
  const [idForDelete, setIdForDelete] = useState({})

  const handleconFirmClose = () => {
    setIsShowModaConfirm(false)
  }
  const handleDeleteUser = (userId) => {
    setIsShowModaConfirm(true)
    // console.log(userId)
    setIdForDelete(userId)
  }
  // console.log('id của xóa',idForDelete) 
  return (
    <>
      <div>
        <div className="my-3">
          List User
          <button
            className="<btn btn-primary btn-sm "
            style={{ float: 'right' }}
            onClick={() => {
              setIsShowModalAddNew(true)
            }}>
            Thêm
          </button>
        </div>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {a &&
            a.length > 0 &&
            a.map((a, b) => {
              return (
                <tr key={`users ${b}`}>
                  <td style={{ textAlign: 'center', backgroundColor: 'pink' }}>{a.id}</td>
                  <td style={{ textTransform: 'capitalize' }}>
                    <div style={{ color: '', fontSize: '14px' }}>{a.first_name}</div>
                  </td>
                  <td style={{ textTransform: 'capitalize' }}>
                    <div style={{ color: '', fontSize: '14px' }}>{a.last_name}</div>
                  </td>
                  <td style={{ textTransform: 'capitalize' }}>
                    <div style={{ color: '', fontSize: '14px' }}>{a.email}</div>
                  </td>
                  <td>
                    <div
                      style={{
                        backgroundImage: `url( ${a.avatar})`,
                        paddingTop: '100%',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        minWidth: 60,
                      }}></div>
                  </td>
                  <td>
                    <Button
                      variant="primary"
                      size="sm"
                      style={{ margin: '5px' }}
                      onClick={() => {
                        setIsShowModalEditUser(true)
                        setDataUserEdit(a)
                      }}>
                      Sửa
                    </Button>
                    <Button
                      variant="warning"
                      size="sm"
                      style={{ margin: '5px' }}
                      onClick={() => {
                        handleDeleteUser(a)
                      }}>
                      Xóa
                    </Button>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </Table>
      <ReactPaginate
        nextLabel="next >"
        previousLabel="< previous"
        onPageChange={handlePageClick}
        pageCount={totalPape}
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination justify-content-center"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        activeClassName="active"
        // renderOnZeroPageCount={null}
      />
      <ModalAddNew
        show={isShowModalAddNew}
        handleClose={handleClose}
        handleUpdateTable={handleUpdateTable}
      />
      <ModalEditUser
        show={isShowModalEditUser}
        handleEditClose={handleEditClose}
        dataUserEdit={dataUserEdit}
        handleUpdateEditTable={handleUpdateEditTable}
      />
      <ModalConfirm
        show={isShowModalConfirm}
        handleconFirmClose={handleconFirmClose}
        C={C}
        idForDelete={idForDelete}
        handleDelete ={handleDelete}
      />
    </>
  )
}
export default TableUsers
