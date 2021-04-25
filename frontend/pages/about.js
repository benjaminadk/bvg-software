import About from '@/components/About'

import { getAboutPage } from '@/lib/strapi'

function AboutPage({ aboutPage }) {
  return <About aboutPage={aboutPage} />
}

export async function getStaticProps() {
  const aboutPage = await getAboutPage()

  if (!aboutPage) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      aboutPage,
    },
    revalidate: 1,
  }
}

export default AboutPage
