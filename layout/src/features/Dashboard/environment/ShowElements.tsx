import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@Hooks/redux.hook'
import { Row, Col } from 'react-bootstrap'
import { initalize } from './Environment.store'
import CircularProgress from '@Components/CircularProgress'

const ShowElements = () => {
  const infor = useAppSelector((state) => state.environment.infor)
  const status = useAppSelector((state) => state.environment.fetchState)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (status === 'idle') {
      console.log('Tiến hành thực thi lấy dữ liệu!')
      dispatch(initalize())
    }
  }, [status, dispatch])

  return (
    <>
      {status === 'loading' && (
        <h3 className='text-center'>Đang tải dữ liệu kế hoạch</h3>
      )}
      {status === 'succeeded' && (
        <>
          <Row className='justify-content-center'>
            <Col>
              <CircularProgress
                value={infor.temperature}
                text={`${infor.temperature}*C`}
                min={0}
                max={100}
                label='Nhiệt độ'
                color='red'
              />
            </Col>
            <Col>
              <CircularProgress
                value={infor.humidity}
                text={`${infor.humidity}%`}
                min={0}
                max={100}
                label='Độ ẩm'
                color='blue'
              />
            </Col>
            <Col>
              <CircularProgress
                value={infor.ph}
                text={`${infor.ph}`}
                min={0}
                max={14}
                label='Độ pH'
                color='brown'
              />
            </Col>
            <Col>
              <CircularProgress
                value={infor.rainfall}
                text={`${infor.rainfall}mm`}
                min={0.5}
                max={50000}
                label='Lượng mưa'
                color='green'
              />
            </Col>
          </Row>
          <hr />
          <Row>
            <Col>
              <CircularProgress
                value={infor.percen_foods * 100}
                text={`${(infor.percen_foods * 100).toFixed(1)}%`}
                min={0}
                max={100}
                label='Lượng thức ăn'
                color='red'
              />
            </Col>
            <Col>
              <CircularProgress
                value={infor.atmos_pressure}
                min={840}
                max={1084.8}
                text={`${infor.atmos_pressure}hPa`}
                label='Áp suất khí quyển'
                color='blue'
              />
            </Col>
            <Col>
              <CircularProgress
                value={infor.wind_speed}
                min={0}
                max={200}
                text={`${infor.wind_speed}km/h`}
                label='Tốc độ gió'
                color='brown'
              />
            </Col>
            <Col>
              <CircularProgress
                value={infor.energy}
                min={0}
                max={10000}
                text={`${infor.energy}kJ`}
                label='Năng lượng'
                color='green'
              />
            </Col>
          </Row>
          <hr />
        </>
      )}
    </>
  )
}

export default ShowElements
