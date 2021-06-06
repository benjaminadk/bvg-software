import dynamic from 'next/dynamic'
import Container from 'react-bootstrap/Container'

import Landing from './Landing'

const DynamicContents = dynamic(() => import('@/components/Home/Contents'))
const DynamicServices = dynamic(() => import('@/components/Home/Services'))
const DynamicContact = dynamic(() => import('@/components/Home/Contact'))

function Home({ homePage }) {
  const { landing, contents, services } = homePage
  return (
    <Container className='Home'>
      <Landing landing={landing} />
      <DynamicContents contents={contents} />
      <DynamicServices services={services} />
      <DynamicContact />
    </Container>
  )
}

export default Home
