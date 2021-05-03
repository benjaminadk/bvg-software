import React, { useMemo } from 'react'

function Ol({ children }) {
  const modifiedChildren = useMemo(() =>
    children.map(
      (el, i) =>
        el.props && { ...el, props: { ...el.props, number: (i + 1) / 2 } },
      []
    )
  )

  return <ol>{modifiedChildren}</ol>
}

export default Ol
