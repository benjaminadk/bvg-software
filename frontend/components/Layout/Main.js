import { forwardRef } from 'react'

const Main = forwardRef((props, ref) => (
  <main ref={ref} className='Main'>
    {props.children}
  </main>
))

Main.displayName = 'Main'

export default Main
