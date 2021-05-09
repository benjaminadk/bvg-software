import moment from 'moment'

function formatDate(date) {
  return moment(date).format('MMMM Do, YYYY')
}

export default formatDate
