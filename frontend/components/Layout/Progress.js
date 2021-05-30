import { useAppState } from '@/lib/context'
import ProgressBar from 'react-bootstrap/ProgressBar'

function Progress() {
  const { progress } = useAppState()

  return <ProgressBar className='Progress' variant='pink-500' min={0} max={100} now={progress} />
}

export default Progress
