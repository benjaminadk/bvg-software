import parser from './parser'

function Markdown({ source }) {
  const res = parser.processSync(source)

  return <div className='Markdown'>{res.result}</div>
}

export default Markdown
