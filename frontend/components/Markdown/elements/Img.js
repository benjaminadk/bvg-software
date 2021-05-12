import { useState, Fragment } from 'react'
import Image from 'next/image'
import Figure from 'react-bootstrap/Figure'
import Modal from 'react-bootstrap/Modal'

function Img({ src, alt, width, height }) {
  const [show, setShow] = useState(false)

  if (!width) return null

  return (
    <Fragment>
      <Figure
        className='d-flex flex-column align-items-center cursor-zoom-in my-4'
        onClick={() => setShow(true)}
      >
        <Image src={src} alt={alt} width={width} height={height} />
        <Figure.Caption className='mt-1'>{alt}</Figure.Caption>
      </Figure>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Body>
          <Image src={src} alt={alt} width={width} height={height} />
        </Modal.Body>
      </Modal>
    </Fragment>
  )
}

export default Img
