import React from 'react'
import styled from 'styled-components'
import { lighten, darken } from 'polished'

import parser from './parser'

function Markdown({ source, className }) {
  const res = parser.processSync(source)

  return (
    <Container>
      <div className={className}>{res.result}</div>
    </Container>
  )
}

const Container = styled.div`
  h2 {
    font-size: 2.6rem;
    font-weight: ${(p) => p.theme.font.normal};
    margin-top: 4rem;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 2rem;
    font-weight: ${(p) => p.theme.font.normal};
    margin-top: 4rem;
  }

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

  p > a {
    color: ${(p) => p.theme.color.primary};

    &:hover {
      text-decoration: underline;
    }
  }

  p {
    font-size: 1.7rem;
    text-align: justify;
    line-height: 1.4;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }

  p > code,
  li > code {
    font-size: 1.3rem;
    background-color: ${(p) => lighten(0.45, p.theme.color.primary)};
    color: ${(p) => p.theme.color.primary};
    padding: 0.2rem 0.4rem;
    border-radius: 0.4rem;
  }

  ul {
    padding-left: 2rem;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }

  blockquote {
    display: flex;
    justify-content: center;

    & > p {
      background-color: ${(p) => lighten(0.45, p.theme.color.warning)};
      color: ${(p) => darken(0.15, p.theme.color.warning)};
      border: 1px solid ${(p) => lighten(0.35, p.theme.color.warning)};
      border-radius: ${(p) => p.theme.borderRadius};
      padding: 1.2rem 2rem;

      & > code {
        background-color: ${(p) => lighten(0.45, p.theme.color.warning)};
        color: ${(p) => darken(0.15, p.theme.color.warning)};
      }
    }
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

  .filename {
    font-family: ${(p) => p.theme.font.code};
    font-size: 1.6rem;
    background-color: ${(p) => p.theme.color.gray100};
    border: 1px solid ${(p) => p.theme.color.black};
    border-top-right-radius: ${(p) => p.theme.borderRadius};
    border-top-left-radius: ${(p) => p.theme.borderRadius};
    border-bottom: 0;
    padding: 0.75rem 1rem;
    margin-top: 3rem;
  }

  .flex-row {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .flex-line {
    display: flex;
    align-items: center;
  }

  .mr-1 {
    margin-right: 1rem;
  }

  .mt-5 {
    margin-top: 5rem;
  }
`

export default Markdown
