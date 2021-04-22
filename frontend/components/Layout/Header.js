import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

import { MAIN_MENU_ITEMS } from '../../lib/constants'

function Header() {
  return (
    <Container>
      <div className='navbar'>
        <Link href='/'>
          <a className='brand'>Benjamin Brooke</a>
        </Link>
        <nav>
          {MAIN_MENU_ITEMS.map((item) => (
            <Link key={item.text} href={item.href}>
              <li>
                <a>{item.text}</a>
              </li>
            </Link>
          ))}
        </nav>
      </div>
    </Container>
  )
}

const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  height: ${(p) => p.theme.headerHeight};
  background-color: ${(p) => p.theme.color.white};
  box-shadow: ${(p) => p.theme.shadows[1]};

  .navbar {
    max-width: ${(p) => p.theme.maxWidth};
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .brand {
      font-size: 2.2rem;
      font-weight: ${(p) => p.theme.font.normal};
    }

    nav {
      list-style: none;
      display: flex;

      li {
        font-size: 1.6rem;
        font-weight: ${(p) => p.theme.font.bold};
        padding: 32px 2rem 26px;
        border-bottom: 4px solid ${(p) => p.theme.color.white};
        cursor: pointer;

        &:hover {
          border-color: ${(p) => p.theme.color.secondary};
        }
      }
    }
  }
`

export default Header
