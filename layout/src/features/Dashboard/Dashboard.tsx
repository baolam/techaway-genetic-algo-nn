import React from 'react'
import RouteSystem from '@Components/RouteSystem.component'
import { Row, Col, Tab, ListGroup } from 'react-bootstrap'
import Environment from './environment/Environment'
import { useAppDispatch } from '@Hooks/redux.hook'
import { onChangeShowModal } from './environment/Environment.store'
import Generation from './Generation/Generation'
import Creature from './Creature/Creature'
import Algo from './Algo/Algo'

const Dashboard = () => {
  const dispatch = useAppDispatch()

  return (
    <div>
      <RouteSystem />
      <Tab.Container id='dashboard' defaultActiveKey={'#environment'}>
        <Row>
          <Col xs={3}>
            <ListGroup>
              <ListGroup.Item>
                <h4 className='text-center'>Cài đặt</h4>
              </ListGroup.Item>
              <ListGroup.Item action href='#environment'>
                Thông tin môi trường
              </ListGroup.Item>
              <ListGroup.Item action href='#algo'>
                Thuật toán
              </ListGroup.Item>
            </ListGroup>
            <ListGroup>
              <ListGroup.Item>
                <h4 className='text-center'>Hành động</h4>
              </ListGroup.Item>
              <ListGroup.Item
                action
                disabled
                onClick={() => {
                  dispatch(onChangeShowModal(true))
                }}
              >
                Chỉnh sửa môi trường
              </ListGroup.Item>
              <ListGroup.Item action disabled>
                Chỉnh sửa thông số thuật toán
              </ListGroup.Item>
            </ListGroup>
            <ListGroup>
              <ListGroup.Item>
                <h4 className='text-center'>Kết quả</h4>
              </ListGroup.Item>
              <ListGroup.Item action href='#generations'>
                Thế hệ
              </ListGroup.Item>
              <ListGroup.Item action href='#creature'>
                Sinh vật
              </ListGroup.Item>
            </ListGroup>
            <hr />
          </Col>
          <Col xs={9}>
            <Tab.Content>
              <Tab.Pane eventKey={'#environment'}>
                <Environment />
              </Tab.Pane>
              <Tab.Pane eventKey={'#algo'}>
                <Algo />
              </Tab.Pane>
              <Tab.Pane eventKey={'#generations'}>
                <Generation />
              </Tab.Pane>
              <Tab.Pane eventKey={'#creature'}>
                <Creature />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  )
}

export default Dashboard
