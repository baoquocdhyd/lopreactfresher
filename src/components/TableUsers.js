import Table from 'react-bootstrap/Table'
import axios from 'axios'
import moment from 'moment'
import dateFormat from 'dateformat'

import { useState, useLayoutEffect } from 'react'

const TableUsers = (props) => {
  const [a, setA] = useState([])

  const Fi = async () => {
    const A = await axios.get('https://danhsachdiennao.herokuapp.com/api/get')
    setA(A.data)
  }
  useLayoutEffect(() => {
    Fi()
  }, [])
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {a.map((a, b) => {
            return (
              <tr key={b}>
                <td style={{ textAlign: 'center', backgroundColor: 'pink' }}>{a.id}</td>
                <td style={{ textTransform: 'capitalize' }}>
                  <div style={{ color: 'red', fontSize: '14px' }}>
                    {' '}
                    {a.ho} {a.ten}
                  </div>
                  <div> - SNV: {a.sohoso}</div>
                  <div>- SĐT: {a.sodienthoai}</div>
                </td>
                <td>
                  <div> {a.gioitinh === true ? 'Nam' : 'Nữ'}</div>
                  <div> {dateFormat(a.namsinh, 'yyyy')}</div>
                </td>
                <td style={{ textAlign: 'left', backgroundColor: 'rgb(195, 255, 217)' }}>
                  {moment(a.ngayhendo).format('HH:mmA ddd')} <br />
                  {moment(a.ngayhendo).format('DD-MM-YYYY ')}
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </>
  )
}
export default TableUsers
