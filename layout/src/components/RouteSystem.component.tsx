import { NavLink } from 'react-router-dom'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import '@Assets/css/RouteSystem.css'

const RouteSystem = () => {
  return (
    <>
      <Navbar bg='dark' data-bs-theme='dark'>
        <Container fluid>
          {/* <Navbar.Brand>Hiển thị</Navbar.Brand> */}
          <Nav className='me-auto'>
            <Nav.Link as={NavLink} to='/about'>
              About
            </Nav.Link>
            <Nav.Link as={NavLink} to='/dashboard'>
              Dashboard
            </Nav.Link>
          </Nav>
          <Nav className='ml-auto'>
            <Nav.Link
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              as={NavLink}
              to={'/user/profile'}
            >
              Xin chào
            </Nav.Link>
            <Nav.Link>
              {
                <OverlayTrigger
                  placement='bottom'
                  overlay={<Tooltip id='tooltip'>KKK, à hú</Tooltip>}
                >
                  <img
                    alt='User logo'
                    src={require('@Assets/user.avatar.png')}
                    // onClick={onClickLogout}
                    className='user-icon'
                    style={{ width: '40px', height: '40px' }}
                  />
                </OverlayTrigger>
              }
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default RouteSystem
