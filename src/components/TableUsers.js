import Table from 'react-bootstrap/Table'
import axios from '../services/axios.js'

import moment from 'moment'
import dateFormat from 'dateformat'
import { fetchAllUser } from '../services/UserService.js'
import { useState, useLayoutEffect } from 'react'
import ReactPaginate from 'react-paginate'
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
  const pageCount = () => {}
  console.log('Tong so trang', b)
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Image</th>
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
    </>
  )
}
export default TableUsers
