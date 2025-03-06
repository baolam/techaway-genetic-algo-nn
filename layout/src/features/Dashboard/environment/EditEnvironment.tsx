import React, { useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import { IEnvironmentInfor, onUpdateEnvInfor } from './Environment.store'
import { updateEnvironmentInfor } from './Environment.API'
import { useAppDispatch } from '@Hooks/redux.hook'

interface IEnvironmentProps {
  show: boolean
  onHide: () => void
}

const defaultInfor: IEnvironmentInfor = require('@Assets/default_env.infor.json')
const EditEnvironment: React.FC<IEnvironmentProps> = ({ show, onHide }) => {
  const [temperature, setTemperature] = useState(defaultInfor.temperature)
  const [humidity, setHumidity] = useState(defaultInfor.humidity)
  const [ph, setPh] = useState(defaultInfor.ph)
  const [rainfall, setRainfall] = useState(defaultInfor.rainfall)
  const [percenFoods, setPercenFoods] = useState(defaultInfor.percen_foods)
  const [atmosPressure, setAtmosPressure] = useState(
    defaultInfor.atmos_pressure
  )
  const [windSpeed, setWindSpeed] = useState(defaultInfor.wind_speed)
  const [energy, setEnergy] = useState(defaultInfor.energy)
  const dispatch = useAppDispatch()

  const onUpdateEnv = () => {
    const updatedInfor: IEnvironmentInfor = {
      temperature,
      humidity,
      ph,
      rainfall,
      percen_foods: percenFoods,
      atmos_pressure: atmosPressure,
      wind_speed: windSpeed,
      energy,
    }

    updateEnvironmentInfor(updatedInfor).then(() => {
      dispatch(onUpdateEnvInfor(updatedInfor))
      onHide()
    })
  }

  return (
    <Modal show={show}>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Chỉnh sửa thông tin môi trường</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Nhiệt độ</Form.Label>
                <Form.Control
                  type='number'
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  min={0}
                  max={100}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Độ ẩm</Form.Label>
                <Form.Control
                  type='number'
                  value={humidity}
                  onChange={(e) => setHumidity(parseFloat(e.target.value))}
                  min={0}
                  max={100}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group>
            <Form.Label>Độ pH</Form.Label>
            <Form.Control
              type='number'
              value={ph}
              onChange={(e) => setPh(parseFloat(e.target.value))}
              min={0}
              max={14}
            />
          </Form.Group>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Lượng mưa</Form.Label>
                <Form.Control
                  type='number'
                  value={rainfall}
                  onChange={(e) => setRainfall(parseFloat(e.target.value))}
                  min={0.5}
                  max={50000}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Lượng thức ăn</Form.Label>
                <Form.Control
                  type='number'
                  value={percenFoods}
                  onChange={(e) => setPercenFoods(parseFloat(e.target.value))}
                  min={0}
                  max={1}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Áp suất khí quyển</Form.Label>
                <Form.Control
                  type='number'
                  value={atmosPressure}
                  onChange={(e) => setAtmosPressure(parseFloat(e.target.value))}
                  min={840}
                  max={1084.8}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Tốc độ gió</Form.Label>
                <Form.Control
                  type='number'
                  value={windSpeed}
                  onChange={(e) => setWindSpeed(parseFloat(e.target.value))}
                  min={0}
                  max={200}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group>
            <Form.Label>Năng lượng</Form.Label>
            <Form.Control
              type='number'
              value={energy}
              onChange={(e) => setEnergy(parseFloat(e.target.value))}
              min={0}
              max={10000}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='outline-success' onClick={onUpdateEnv}>
          Gửi
        </Button>
        <Button variant='outline-primary' onClick={onHide}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditEnvironment
