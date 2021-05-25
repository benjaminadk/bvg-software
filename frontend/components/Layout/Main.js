import { forwardRef } from 'react'

const Main = forwardRef((props, ref) => (
  <main ref={ref} className='min-vh-100 py-5'>
    {props.children}
  </main>
))

Main.displayName = 'Main'

export default Main
