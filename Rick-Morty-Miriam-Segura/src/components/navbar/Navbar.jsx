import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'

export const Navbar = () => {
    const currentCharacter = useSelector((state) => state.character.currentCharacter );

  return (
    <Row className='navbar'>
      <Col xs={3}></Col>
      <Col xs={6}>
        <h1>Rick&Morty</h1>
      </Col>
      <Col xs={3} >
      {currentCharacter?.image && 
        <div className='avatar d-flex align-items-center justify-content-end'>
          <img src={currentCharacter.image} alt="" />
          <p className='d-none d-sm-inline'>My profile</p>
        </div>}
      </Col>
    </Row>
  )
}
