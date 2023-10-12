import {Card} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export const CardCharacter = ({character}) => {

    const navigate = useNavigate()
    
    const handleClick = () => {
        navigate(`/profile/${character.id}`)
    }

  return (
    <Card className='w-100 character_card' onClick={handleClick}>
    <Card.Img  variant="top" src={character.image} className='character_card_img'/>
    <Card.Body className='px-1'>
      <Card.Title className='title'>{character.name}</Card.Title>
      <Card.Text className='title'>{character.id}</Card.Text>
      <Card.Text>
        <>
        <span 
        className={`${
          character.status==="Alive" ? 'alive status d-block d-lg-inline' : 'status'
        } ${
          character.status==="Dead" ? 'dead status d-block d-lg-inline' : 'd-block  d-lg-inline status'
        } `} 
        >{character.status}</span><span className='d-none d-lg-inline'> | </span><span>{character.species}</span> | <span>{character.gender}</span>
        </>
      </Card.Text>
    </Card.Body>
  </Card>
  )
}
