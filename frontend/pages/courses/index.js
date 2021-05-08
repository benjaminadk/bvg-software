import Courses from '@/components/Courses'

import { getCoursesPage, getCourses } from '@/lib/strapi'

function CoursesPage({ courses }) {
  return <Courses courses={courses} />
}

export async function getStaticProps() {
  const coursesPage = await getCoursesPage()
  const courses = await getCourses()

  if (!courses || !coursesPage) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      coursesPage,
      courses,
    },
    revalidate: 1,
  }
}

export default CoursesPage
