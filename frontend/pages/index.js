import PropTypes from 'prop-types'
import Home from '@/components/Home'

import { getHomePage } from '@/lib/strapi'

function HomePage({ homePage }) {
  return <Home homePage={homePage} />
}

export async function getStaticProps() {
  const homePage = await getHomePage()

  if (!homePage) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      homePage,
    },
    revalidate: 1,
  }
}

HomePage.propTypes = {
  homePage: PropTypes.object,
}

export default HomePage
