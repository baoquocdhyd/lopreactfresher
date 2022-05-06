import * as React from 'react'
import { useState, useEffect, useLayoutEffect } from 'react'
import axios from '../axios.js'
import moment from 'moment'
import dateFormat from 'dateformat'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'

const ThuchanhMUI = () => {
  const [a, setA] = useState([])
  const [b, setB] = useState([])
  const [c, setC] = useState(false)
  const [d, setD] = useState(false)

  const Fi = async () => {
    const A = await axios.get('/api/get')
    setA(A)
  }
  useLayoutEffect(() => {
    Fi()
  }, [])

  console.log(a)

  let C = async (a) => {
    try {
      await axios.delete('/api/delete', { data: { id: a.id } })
      Fi()
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <div>
      <h1>Hello</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell align="left">Họ và Tên</TableCell>
              <TableCell align="left">Giới</TableCell>
              <TableCell align="left">Ngày hẹn đo</TableCell>
              <TableCell align="left">Ngày đo EEG</TableCell>
              <TableCell align="left">Loại chỉ định</TableCell>
              <TableCell align="left">KTV</TableCell>
              <TableCell align="left">Ghi chú</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {a.map((a, b) => (
              <TableRow key={b} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {a.id}
                </TableCell>
                <TableCell align="left" style={{ textTransform: 'capitalize' }}>
                  {a.ho} &nbsp; {a.ten}
                </TableCell>
                <TableCell align="left">
                  <div> {a.gioitinh === true ? 'Nam' : 'Nữ'}</div>
                  <div> {dateFormat(a.namsinh, 'yyyy')}</div>
                </TableCell>
                <TableCell align="left">
                  {moment(a.ngayhendo).format('HH:mmA ddd')} <br />
                  {moment(a.ngayhendo).format('DD-MM-YYYY ')}
                </TableCell>
                <TableCell align="left">
                  {moment(a.ngaydo).format('HH:mmA ddd')} <br />
                  {moment(a.ngaydo).format('DD-MM-YYYY ')}
                </TableCell>
                <TableCell align="left">
                  - {a.loaichidinh} <br /> - {a.tinhtrangdo} <br />- {a.khoaphong}
                </TableCell>
                <TableCell align="left" style={{ textTransform: 'capitalize' }}>
                  - KTV: {a.kythuavien} <br /> - BS: {a.bacsi}
                </TableCell>
                <TableCell align="left">{a.ghichu}</TableCell>
                <TableCell align="left">
                  <Button
                    variant="contained"
                    style={{ height: '28px', width: '40px', display: 'block', margin: '5px' }}
                    size="small"
                    onClick={() => {
                      setB(a)
                      setC(true)
                    }}>
                    Sửa
                  </Button>
                  <Button
                    style={{ height: '28px', width: '40px', display: 'block', margin: '5px' }}
                    variant="contained"
                    size="small"
                    onClick={() => {
                      C(a)
                    }}>
                    Xóa
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default ThuchanhMUI
