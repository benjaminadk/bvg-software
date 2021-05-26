import Container from 'react-bootstrap/Container'

import Landing from './Landing'
import Services from './Services'
import Contents from './Contents'

function Home({ homePage }) {
  const { landing, contents, services } = homePage
  return (
    <Container id='Home'>
      <Landing landing={landing} />
      <Contents contents={contents} />
      <Services services={services} />
    </Container>
  )
}

export default Home
