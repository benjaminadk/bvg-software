import { format } from 'date-fns'

const formats = ['MMM do, yyyy', 'yyyy-MM-dd']

function formatDate(date, index) {
  return format(new Date(date), formats[index])
}

export default formatDate
