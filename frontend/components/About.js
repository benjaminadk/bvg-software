import Markdown from '@/components/Markdown'

function About({ aboutPage }) {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-lg-8 offset-lg-2'>
          <Markdown source={aboutPage.content} />
        </div>
      </div>
    </div>
  )
}

export default About
