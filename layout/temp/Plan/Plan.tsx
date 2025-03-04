import React from 'react';
import ShowCalendar from './Calendar/ShowCalendar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import ListGroup from 'react-bootstrap/ListGroup';
import RouteSystem from '@Components/RouteSystem.component';
import ModalCalendar from './Calendar/ModalCalendar';
import EventCalendar from './EventCalendar/Events.component';
import EventModal from './EventCalendar/EventModal';
// import { useLogin } from '@Providers/UserLoginProvider';

const Plan = () => {
  const isLogin = true;

  return (
    <div>
      <RouteSystem />
      {!isLogin && <p>Hãy tiến hành đăng nhập!</p>}
      {isLogin && (
        <>
          <Tab.Container id="plan_functions" defaultActiveKey="#schedule">
            <Row>
              <Col xs={3}>
                <h4 className="text-center">Hiển thị</h4>
                <ListGroup>
                  <ListGroup.Item action href="#schedule" className="text-bold">
                    Lịch biểu
                  </ListGroup.Item>
                </ListGroup>
                <ListGroup>
                  <ListGroup.Item action href="#events">
                    Các sự kiện
                  </ListGroup.Item>
                </ListGroup>
                <hr />
              </Col>
              <Col>
                <Tab.Content>
                  <Tab.Pane eventKey="#schedule">
                    <ModalCalendar />
                    <ShowCalendar />
                  </Tab.Pane>
                  <Tab.Pane eventKey="#events">
                    <EventModal />
                    <EventCalendar />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </>
      )}
    </div>
  );
};

export default Plan;
