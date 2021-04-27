import React, { useMemo } from 'react'
import styled from 'styled-components'

function Ol({ children }) {
  const modifiedChildren = useMemo(() =>
    children.map(
      (el, i) =>
        el.props && { ...el, props: { ...el.props, number: (i + 1) / 2 } },
      []
    )
  )

  return <Container>{modifiedChildren}</Container>
}

const Container = styled.ol`
  padding-left: 3rem;
  padding-right: 3rem;
`

export default Ol
