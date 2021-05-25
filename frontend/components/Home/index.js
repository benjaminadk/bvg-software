import Container from 'react-bootstrap/Container'

import Landing from './Landing'
import Banner from './Banner'
import Services from './Services'
import Contents from './Contents'

function Home({ homePage }) {
  const { landing, contents, services } = homePage
  return (
    <Container id='Home'>
      <Landing landing={landing} />
      <Banner
        heading='Content'
        text='Learn everything I know about web development throught free blog posts and affordable courses.'
      />
      <Contents contents={contents} />
      <Banner
        heading='Services'
        text='I offer a wide range of freelance services. Contact me to schedule a free consultation.'
      />
      <Services services={services} />
    </Container>
  )
}

export default Home
