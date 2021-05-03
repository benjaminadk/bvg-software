import React from 'react'
import styled from 'styled-components'
import { lighten, darken } from 'polished'

import parser from './parser'

function Markdown({ source }) {
  const res = parser.processSync(source)

  return <div className='markdown-container'>{res.result}</div>
}

const Container = styled.div`
  h4 {
    display: inline-block;
    font-size: 1.8rem;
    font-weight: ${(p) => p.theme.font.normal};
    margin-top: 2rem;
    margin-bottom: 0;
    background-color: ${(p) => lighten(0.45, p.theme.color.warning)};
    color: ${(p) => darken(0.15, p.theme.color.warning)};
    border: 1px solid ${(p) => lighten(0.35, p.theme.color.warning)};
    border-radius: ${(p) => p.theme.borderRadius};
    padding: 1.2rem 2rem;
  }

  ul {
    padding-left: 2rem;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
    font-size: 1.6rem;
    border: 1px solid ${(p) => p.theme.color.gray100};
    margin-bottom: 3rem;
  }

  table th {
    background-color: ${(p) => p.theme.color.white};
    padding: 0.75rem 1.5rem;
  }

  table td {
    padding: 0.75rem 1.5rem;
  }

  table tr {
    background-color: ${(p) => p.theme.color.white};
  }

  table tr:nth-child(odd) {
    background-color: ${(p) => p.theme.color.gray100};
  }
`

export default Markdown
