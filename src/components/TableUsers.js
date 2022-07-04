import ModalAddNew from './ModalAddNew.js'
import ModalEditUser from './ModalEditUser.js'
import ModalConfirm from './ModalConfirm.js'
import axios from '../services/axios.js'
import { useState, useLayoutEffect } from 'react'
import ReactPaginate from 'react-paginate'
import Papa from 'papaparse'
import { Table, Button, Form } from 'react-bootstrap'
import _ from 'lodash'
import { debounce } from 'lodash'
import { CSVLink, CSVDownload } from 'react-csv'
import { toast } from 'react-toastify'

const TableUsers = (props) => {
  const [a, setA] = useState([])
  const [ar, setAr] = useState([])

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
      console.log('id đã xóa', idForDelete.id)
      console.log('trả về', res)
    } catch (e) {
      console.log(e)
    }
  }
  const handleDelete = () => {
    const b = a.filter((a, b) => {
      return a.id !== idForDelete.id
    })
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
  const [sortField, setSortField] = useState('id')
  const [sortOrder, setSortOrder] = useState('asc')
  const sort = (field, order) => {
    setSortField(field)
    setSortOrder(order)
    let b = _.cloneDeep(a)
    let c = _.orderBy(b, [field], [order])
    setA(c)
  }
  const [search, setSearch] = useState('')
  let handleSearch = debounce((e) => {
    setSearch(e.target.value)
    if (e.target.value) {
      const s = _.filter(a, function (o) {
        return o.email.includes(e.target.value)
      })
      setA(s)
    } else {
      Fi(1)
    }
  }, 2000)

  const handleImportCSV = () => {
    // Papa.parse(file, {
    //   complete: function(results) {
    //     console.log("Finished:", results.data);
    //   }
    // });
  }

  // console.log('Nội dung tìm kiếm', search)
  // console.log('Nội dungtải về', a)
  // console.log('Nội dung sau thay đổi', ar)

  return (
    <>
      <div>
        <div className="my-3">
          <span>
            <b>List User</b>
          </span>
          <div>
            <CSVLink
              data={a}
              filename={'eeg_export.csv'}
              style={{ float: 'right' }}
              className="btn btn-primary btn-sm  m-3"
             >
              Export CSV
            </CSVLink>
            <button
              className="<btn btn-primary btn-sm m-3 "
              style={{ float: 'right' }}
              onClick={() => {
                setIsShowModalAddNew(true)
              }}>
              Thêm
            </button>
            <Form.Label htmlFor="nut">Import CSV</Form.Label>
            <Button
              as="input"
              type="file"
              size="sm"
              id="nut"
              variant="danger"
              className="m-3"
              disabled={false}
              hidden={false}
              onChange={(e) => {
                if (e.target && e.target.files[0]) {
                  if (e.target.files[0].type !== 'text/csv') {
                    toast.warning('Không phải kiểu csv!')
                    return
                  } else { Papa.parse(e.target.files[0], {
                    header: true,
                    complete: function (results) {
                      console.log('Finished:', results.data)
                      setA(results.data)
                    },
                  })}
                 
                  console.log('giá trị import', e.target.files[0])
                }
              }}></Button>
          </div>
        </div>
      </div>
      <div style={{ margin: '20px 0' }}>
        <Form.Control
          type="text"
          placeholder=""
          onChange={debounce((e) => {
            if (e.target.value) {
              const s = _.filter(a, function (o) {
                return o.email.includes(e.target.value)
              })
              setA(s)
            } else {
              Fi(1)
            }
          }, 2000)}
          // value={search}
          style={{ width: '300px', display: 'inline-block' }}
        />
        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            // let res = await axios.get(`/api/users?page=${1}`)

            //   await setA(res.data)
            const s = a.filter((a, b) => {
              return a.email
                .toLowerCase()
                .normalize('NFD')

                .replace(/[\u0300-\u036f]/g, '')

                .replace(/đ/g, 'd')
                .replace(/Đ/g, 'D')
                .includes(
                  search
                    .toLowerCase()
                    .normalize('NFD')

                    .replace(/[\u0300-\u036f]/g, '')

                    .replace(/đ/g, 'd')
                    .replace(/Đ/g, 'D')
                )
            })

            setA(s)
          }}
          style={{ marginLeft: '20px' }}>
          Tìm kiếm
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              {' '}
              #
              <span style={{ float: 'right' }}>
                {sortField == 'id' && sortOrder === 'asc' && (
                  <i
                    className="fa-solid fa-arrow-down-a-z"
                    style={{ color: 'red', fontSize: '20px', padding: '0 10px' }}
                    onClick={() => {
                      sort('id', 'desc')
                    }}></i>
                )}
                {sortField == 'id' && sortOrder === 'desc' && (
                  <i
                    className="fa-solid fa-arrow-down-z-a"
                    style={{ color: 'red', fontSize: '20px', padding: '0 10px' }}
                    onClick={() => {
                      sort('id', 'asc')
                    }}></i>
                )}

                {sortField == 'last_name' && (
                  <i
                    className="fa-solid fa-align-justify"
                    style={{ color: 'red', fontSize: '20px', padding: '0 10px' }}
                    onClick={() => {
                      sort('id', 'asc')
                    }}></i>
                )}
              </span>
            </th>
            <th>First Name</th>
            <th>
              Last Name
              <span style={{ float: 'right' }}>
                {sortField == 'last_name' && sortOrder == 'asc' && (
                  <i
                    className="fa-solid fa-arrow-down-a-z"
                    style={{ color: 'red', fontSize: '20px', padding: '0 10px' }}
                    onClick={() => {
                      sort('last_name', 'desc')
                    }}></i>
                )}

                {sortField == 'last_name' && sortOrder == 'desc' && (
                  <i
                    className="fa-solid fa-arrow-down-z-a"
                    style={{ color: 'red', fontSize: '20px', padding: '0 10px' }}
                    onClick={() => {
                      sort('last_name', 'asc')
                    }}></i>
                )}

                {sortField == 'id' && (
                  <i
                    className="fa-solid fa-align-justify"
                    style={{ color: 'red', fontSize: '20px', padding: '0 10px' }}
                    onClick={() => {
                      sort('last_name', 'asc')
                    }}></i>
                )}
              </span>
            </th>
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
        handleDelete={handleDelete}
      />
    </>
  )
}
export default TableUsers
