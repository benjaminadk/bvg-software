import Link from 'next/link'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import { MAIN_MENU_ITEMS, SOCIAL_MEDIA_ITEMS } from '../../lib/constants'

function Navigation() {
  return (
    <Navbar className='Navigation' collapseOnSelect expand='lg' bg='secondary' variant='dark'>
      <Container fluid='xxl'>
        <Link href='/' passHref>
          <Navbar.Brand>Benjamin Brooke</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto' activeKey='/' defaultActiveKey='/'>
            {MAIN_MENU_ITEMS.map((item) => (
              <Link key={item.href} eventKey={item.href} href={item.href} passHref>
                <Nav.Link>{item.text}</Nav.Link>
              </Link>
            ))}
          </Nav>
          <Nav className='social-media flex-row'>
            {SOCIAL_MEDIA_ITEMS.map((item) => (
              <Link key={item.href} href={item.href} passHref>
                <Nav.Link className='me-2 p-2'>{item.icon}</Nav.Link>
              </Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation
