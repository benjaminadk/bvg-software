function ProgressBar() {
  return (
    <div id='Progress' className='progress position-sticky'>
      <div
        className='progress-bar'
        role='progressbar'
        aria-valuenow='0'
        aria-valuemin='0'
        aria-valuemax='100'
      ></div>
    </div>
  )
}

export default ProgressBar
