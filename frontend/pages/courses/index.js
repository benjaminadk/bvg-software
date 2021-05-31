import Courses from '@/components/Courses'

import { getCoursesPage, getCourses, getBlogPosts } from '@/lib/strapi'

function CoursesPage({ courses }) {
  return <Courses courses={courses} />
}

export async function getStaticProps() {
  const coursesPage = await getCoursesPage()
  const courses = await getCourses()
  const { posts } = await getBlogPosts(0, 6)

  if (!courses || !coursesPage) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      coursesPage,
      courses,
      recentPosts: posts,
    },
    revalidate: 1,
  }
}

export default CoursesPage
