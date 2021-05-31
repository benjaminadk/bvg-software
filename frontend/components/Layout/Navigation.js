import Link from 'next/link'
import Image from 'next/image'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import { MAIN_MENU_ITEMS, SOCIAL_MEDIA_ITEMS } from '../../lib/constants'

function Navigation() {
  return (
    <Navbar className='Navigation' collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Container fluid='xxl'>
        <Link href='/'>
          <a className='d-flex align-items-center'>
            <div className='brand-logo'>
              <Image
                src='/v1620789277/thumbnail_benjamin_brooke_114909d05e.png'
                alt='Benjamin Brooke Brand Logo'
                width={40}
                height={40}
                priority={true}
              />
            </div>
            <Navbar.Brand className='fw-bold'>Benjamin Brooke</Navbar.Brand>
          </a>
        </Link>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto' activeKey='/' defaultActiveKey='/'>
            {MAIN_MENU_ITEMS.map((item) => (
              <Link key={item.href} eventKey={item.href} href={item.href} passHref>
                <Nav.Link className='fw-bold'>{item.text}</Nav.Link>
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
