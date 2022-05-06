// import axios from '../axios'
import axios from 'axios'
import { useState, useLayoutEffect } from 'react'
import moment from 'moment'
const Suathongtin = ({ b }) => {
  const [a, setA] = useState({
    id: '',
    ho: '',
    ten: '',
    sohoso: '',
    gioitinh: '',
    namsinh: undefined,
    sodienthoai: '',
    ngayhendo: '',
    loaichidinh: '',
    tinhtrangdo: '',
    khoaphong: '',
    ngaydo: undefined,
    kythuavien: '',
    bacsi: '',
    ghichu: '',
    image: '',
  })
  let A = (e, T) => {
    setA({ ...a, [T]: e.target.value })
  }
  let B = async (a) => {
    try {
      let b = await axios.put('https://danhsachdiennao.herokuapp.com/api/put', a)
    } catch (e) {
      console.log(e)
    }
  }
  useLayoutEffect(() => {
    setA({
      id: b.id,
      ho: b.ho,
      sohoso: b.sohoso,
      ten: b.ten,
      gioitinh: b.gioitinh === true ? 1 : 0,
      namsinh: b.namsinh ? moment(b.namsinh).format('YYYY-MM-DD') : undefined,
      sodienthoai: b.sodienthoai,
      ngaynhanhen: moment(b.ngaynhanhen).format('YYYY-MM-DDTHH:mm'),
      ngayhendo: moment(b.ngayhendo).format('YYYY-MM-DDTHH:mm'),
      loaichidinh: b.loaichidinh,
      tinhtrangdo: b.tinhtrangdo,
      khoaphong: b.khoaphong,
      ngaydo: b.ngaydo? moment(b.ngaydo).format('YYYY-MM-DDTHH:mm'): undefined,
      kythuavien: b.kythuavien,
      bacsi: b.bacsi,
      ghichu: b.ghichu,
      image: b.image,
    })
  }, [b])

  // console.log("Sửa bệnh nhân , kiem tra b", b);
  console.log('Sửa bệnh nhân , kiem tra a', a)
  // console.log("test momment: ngày hiện tại", moment().format("HH:mmA ddd, DD-MM-YYYY "));
  // console.log("test momment", moment(b.ngayhendo).format("YYYY-MM-DDTHH:mm"));
  return (
    <div style={{ position: 'absolute', right: '10px' , top: '20px' , backgroundColor: 'white'}}>
      <div
        className=""
        id=""
        style={{
          margin: 10,
          padding: 30,
          width: 450,
          height: 780,
          border: '1px solid black',
          boxShadow: '10px 10px 10px grey',

        }}>
        <h2>Sửa Thông Tin</h2>
        <div className="">
          <label>Họ và tên lót</label>
          <input
            type="text"
            className=""
            onChange={(e) => {
              A(e, 'ho')
            }}
            value={a.ho}
          />
        </div>

        <div className="">
          <label>Tên *</label>
          <input
            type="text"
            className=""
            value={a.ten}
            onChange={(e) => {
              A(e, 'ten')
            }}
          />
        </div>

        <div className="">
          <label>Số hồ sơ</label>
          <input
            type="text"
            className=""
            value={a.sohoso}
            onChange={(e) => {
              A(e, 'sohoso')
            }}
          />
        </div>

        <div className="">
          <input
            type="radio"
            name="gioitinh"
            className="optionBox"
            checked={a.gioitinh == 1}
            onClick={() => {
              setA({ ...a, gioitinh: 1 })
            }}
          />
          <a>Nam </a>
          <input
            type="radio"
            name="gioitinh"
            className="optionBox"
            checked={a.gioitinh == 0}
            onClick={() => {
              setA({ ...a, gioitinh: 0 })
            }}
          />
          <a>Nữ</a>
        </div>

        <div className="" style={{ display: 'block' }}>
          <label>Năm sinh</label>
          <input
            type="date"
            className=""
            value={a.namsinh}
            onChange={(e) => {
              A(e, 'namsinh')
            }}
          />
        </div>

        <div className="">
          <label>Số điện thoại *</label>
          <input
            type="text"
            className=""
            value={a.sodienthoai}
            onChange={(e) => {
              A(e, 'sodienthoai')
            }}
          />
        </div>

        <div className="">
          <label>Ngày nhận hẹn</label>
          <input
            type="datetime-local"
            className=""
            disabled
            value={a.ngaynhanhen}
            onChange={(e) => {
              A(e, 'ngaynhanhen')
            }}
          />
        </div>

        <div className="">
          <label>Ngày hẹn đo</label>
          <input
            type="datetime-local"
            className=""
            value={a.ngayhendo}
            onChange={(e) => {
              A(e, 'ngayhendo')
            }}
          />
        </div>

        <div className="">
          <label className=""> Loại chỉ định </label>
          <select
            className=""
            value={a.loaichidinh}
            onChange={(e) => {
              A(e, 'loaichidinh')
            }}>
            <option value="Thường quy">Thường quy</option>
            <option default value="Thường quy (tại giường)">
              Thường quy (tại giường)
            </option>
            <option value="Giấc ngủ ngắn 60ph">Giấc ngủ ngắn 60ph</option>
            <option value="Giấc ngủ ngắn 60ph (tại giường)">Giấc ngủ ngắn 60ph (tại giường)</option>
            <option value="Giấc ngủ trưa">Giấc ngủ trưa</option>
            <option value="8h">8h</option>
            <option value="8h (tại giường)">8h (tại giường)</option>
            <option value="Qua đêm">Qua đêm</option>
            <option value="Qua đêm (tại giường)">Qua đêm (tại giường)</option>
            <option value="24h">24h</option>
            <option value="24h (tại giường)">24h (tại giường)</option>
          </select>
        </div>

        <div className="">
          <label className=""> Tình trạng đo </label>
          <select
            className=""
            value={a.tinhtrangdo}
            onChange={(e) => {
              A(e, 'tinhtrangdo')
            }}>
            <option defaultValue value="Chưa hẹn">
              Chưa hẹn
            </option>
            <option value="Đã hẹn">Đã hẹn</option>
            <option value="Đang đo">Đang đo</option>
            <option value="Đã đo">Đã đo</option>
            <option value="Đã có kết quả">Đã có kết quả</option>
            <option value="Đã trả kết quả">Đã trả kết quả</option>
          </select>
        </div>

        <div className="">
          <label>Khoa/phòng</label>
          <input
            type="text"
            className=""
            value={a.khoaphong}
            onChange={(e) => {
              A(e, 'khoaphong')
            }}
          />
        </div>

        <div className="">
          <label>Ngày đo</label>
          <input
            type="datetime-local"
            className=""
            value={a.ngaydo}
            onChange={(e) => {
              A(e, 'ngaydo')
            }}
          />
        </div>
        {/* hiện ảnh khi  được chọn */}
        <div className="">
          <label>Kỹ thuật viên</label>
          <input
            type="text"
            className=""
            value={a.kythuavien}
            onChange={(e) => {
              A(e, 'kythuavien')
            }}
          />
        </div>

        <div className="">
          <label>Bác sĩ đọc</label>
          <input
            type="text"
            className=""
            value={a.bacsi}
            onChange={(e) => {
              A(e, 'bacsi')
            }}
          />
        </div>

        <div className="">
          <label>Ghi chú</label>
          <textarea
            style={{ width: '300px' }}
            type="text"
            className=""
            value={a.ghichu}
            placeholder="Bs chỉ định, thời điểm cần kết quả"
            onChange={(e) => {
              A(e, 'ghichu')
            }}
          />
        </div>

        <div className="">
          <label>Hình ảnh</label>
          <input
            style={{ width: '300px' }}
            type="file"
            className=""
            onChange={(e) => {
              setA({ ...a, image: URL.createObjectURL(e.target.files[0]) })
            }}
          />
        </div>

        <div
          style={{
            backgroundImage: `url( ${a.image}  )`,
            height: '100px',
            backgroundSize: '50%',
            backgroundRepeat: 'no-repeat',
          }}>
          {' '}
        </div>

        <button
          className=""
          onClick={() => {
            B(a)
          }}>
          Lưu
        </button>
        <button className="">Thoát</button>
      </div>
    </div>
  )
}

export default Suathongtin
