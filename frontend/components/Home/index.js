import Banner from './Banner'
import Services from './Services'
import Content from './Content'

function Home({ homePage }) {
  const { services, content } = homePage
  return (
    <div id='Home'>
      <Banner text='Buy It' />
      <Services services={services} />
      <Banner text='Learn It' />
      <Content content={content} />
    </div>
  )
}

export default Home
