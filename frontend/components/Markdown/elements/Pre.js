import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { Check } from '@styled-icons/material'
import copy from 'clipboard-copy'

function Pre({ children, className }) {
  const pre = useRef()

  const [copied, setCopied] = useState(false)

  function onClick() {
    copy(pre.current.textContent)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 5000)
  }

  return (
    <Container>
      <pre ref={pre} className={className}>
        {children}
        <span className='copy-icon' onClick={onClick}>
          {copied ? (
            <Check size={20} />
          ) : (
            <span className='copy-text'>COPY</span>
          )}
        </span>
      </pre>
    </Container>
  )
}

const Container = styled.div`
  .copy-icon {
    position: absolute;
    right: 1rem;
    top: 1rem;
    background-color: ${(p) => p.theme.color.gray500};
    margin: 0;
    padding: 0.5rem 1rem;
    cursor: pointer;

    &:hover {
      background-color: ${(p) => p.theme.color.gray500};

      .copy-text {
        color: ${(p) => p.theme.color.white};
      }
    }

    svg {
      color: ${(p) => p.theme.color.black};
    }

    .copy-text {
      font-size: 1.2rem;
      color: ${(p) => p.theme.color.white};
    }
  }

  .highlight {
    position: absolute;
    left: 0;
    width: 100%;
    height: 1.5rem;
    display: inline-block;
    background-color: #eff3db2b;
  }

  code[class*='language-'],
  pre[class*='language-'] {
    direction: ltr;
    tab-size: 2;
    hyphens: none;
    white-space: pre-wrap;
    word-wrap: normal;
    font-family: ${(p) => p.theme.font.code};
    font-size: 1.3rem;
    color: #76d9e6;

    & > span.token {
      font-size: 1.3rem;
    }

    & > span > span.token {
      font-size: 1.3rem;
    }
  }

  pre[class*='language-'],
  :not(pre) > code[class*='language-'] {
    background-color: ${(p) => p.theme.color.black};
  }

  pre[class*='language-'] {
    position: relative;
    overflow: auto;
    line-height: 1.4;
    border-radius: 0.4rem;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    margin: 0;
    padding: 1.4rem;
  }

  pre[class*='language-'] code {
    display: block;
    white-space: pre;
  }

  :not(pre) > code[class*='language-'] {
    padding: 0.15em 0.2em 0.05em;
    border-radius: 0.3em;
    border: 0.13em solid #7a6652;
    box-shadow: 1px 1px 0.3em -0.1em #000 inset;
  }

  .token.namespace {
    opacity: 0.7;
  }

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: #b5b5b5;
    font-style: italic;
  }

  .token.operator,
  .token.boolean,
  .token.number {
    color: #a77afe;
  }

  .token.attr-name,
  .token.string {
    color: #e6d06c;
  }

  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string {
    color: #e6d06c;
  }

  .token.selector,
  .token.inserted {
    color: #a6e22d;
  }

  .token.atrule,
  .token.attr-value,
  .token.keyword,
  .token.important,
  .token.deleted {
    color: #ef3b7d;
  }

  .token.regex,
  .token.statement {
    color: #76d9e6;
  }

  .token.placeholder,
  .token.variable {
    color: #fff;
  }

  .token.important,
  .token.statement,
  .token.bold {
    font-weight: bold;
  }

  .token.punctuation {
    color: #bebec5;
  }

  .token.entity {
    cursor: help;
  }

  .token.italic {
    font-style: italic;
  }

  code.language-markup {
    color: #f9f9f9;
  }

  code.language-markup .token.tag {
    color: #ef3b7d;
  }

  code.language-markup .token.attr-name {
    color: #a6e22d;
  }

  code.language-markup .token.attr-value {
    color: #e6d06c;
  }

  code.language-markup .token.style,
  code.language-markup .token.script {
    color: #76d9e6;
  }

  code.language-markup .token.script .token.keyword {
    color: #76d9e6;
  }

  code.language-html .token.attr-value {
    color: #a5d14d;
  }
`

export default Pre