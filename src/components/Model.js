import React from 'react'
import { Modal, Button } from 'react-bootstrap'
function Model({show, handleClose, title, children, footer}) {
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
            {footer ? (
                footer
            ) : (
                <>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </>
            )}
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Model
