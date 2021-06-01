import Container from 'react-bootstrap/Container'

import Landing from './Landing'
import Contents from './Contents'
import Services from './Services'
import Contact from './Contact'

function Home({ homePage }) {
  const { landing, contents, services } = homePage
  return (
    <Container className='Home'>
      <Landing landing={landing} />
      <Contents contents={contents} />
      <Services services={services} />
      <Contact />
    </Container>
  )
}

export default Home
