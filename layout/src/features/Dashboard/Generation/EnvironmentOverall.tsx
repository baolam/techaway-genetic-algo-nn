import React, { useEffect, useState } from 'react'
import { useAppSelector } from '@Hooks/redux.hook'
import { Row, Col } from 'react-bootstrap'
import CircularProgress from '@Components/CircularProgress'
import { getEnvironmentOverall } from './GenerationAPI'
import { IEnvironmentInfor } from '../environment/Environment.store'

const EnvironmentOverall = () => {
  const situation = useAppSelector(
    (state) => state.generation.selectedSituation
  )
  const [infor, setOverall] = useState<IEnvironmentInfor | null>(null)

  useEffect(() => {
    getEnvironmentOverall(situation)
      .then((res: any) => setOverall(res))
      .catch((err) => setOverall(null))
  }, [situation])

  return (
    <>
      {infor === null && <div>loading...</div>}
      {infor !== null && (
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
        </>
      )}
    </>
  )
}

export default EnvironmentOverall
