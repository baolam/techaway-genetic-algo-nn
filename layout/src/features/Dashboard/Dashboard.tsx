import React from 'react'
import RouteSystem from '@Components/RouteSystem.component'
import { Row, Col, Tab, ListGroup } from 'react-bootstrap'
import Environment from './Environment'

const Dashboard = () => {
  return (
    <div>
      <RouteSystem />
      <Tab.Container id="dashboard" defaultActiveKey={'#environment'}>
        <Row>
          <Col xs={3}>
            <h4 className='text-center'>Chỉ mục nhanh</h4>
            <ListGroup>
              <ListGroup.Item action href='#environment'>Môi trường</ListGroup.Item>
            </ListGroup>
            <hr/>
          </Col>
          <Col xs={9}>
            <Tab.Content>
              <Tab.Pane eventKey={'#environment'}>
                <Environment />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  )
}

export default Dashboard