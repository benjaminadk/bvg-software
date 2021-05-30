import { format } from 'date-fns'

const formats = ['MMM do, yyyy', 'yyyy-MM-dd', 'yyyy']

function formatDate(date, index) {
  return format(new Date(date), formats[index])
}

export default formatDate
