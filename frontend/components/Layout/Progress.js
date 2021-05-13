import { useAppState } from '@/lib/context'
import cn from 'classnames'

function ProgressBar() {
  const { progress } = useAppState()

  return (
    <div id='Progress' className={cn('progress position-sticky bg-gray-300')}>
      <div
        className='progress-bar bg-pink-500'
        role='progressbar'
        style={{ width: progress + '%' }}
        aria-valuenow={progress}
        aria-valuemin='0'
        aria-valuemax='100'
      ></div>
    </div>
  )
}

export default ProgressBar
