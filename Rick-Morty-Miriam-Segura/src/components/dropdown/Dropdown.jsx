import {Col} from 'react-bootstrap'
import Right from '../../assets/images/Right.svg'

export const Dropdown = ({
    data, 
    onClick, 
    open,
    image, 
    text 
    }) => {

  return (
    <Col xs={12} className=" d-flex justify-content-center">
        <div className={open ? 'dropdown dropdown-expanded' : 'dropdown'}>
            <div className='d-flex align-items-center justify-content-between'>
                <div className='d-flex align-items-center'>
                    <img src={image} alt={text}  />
                    <p className='mb-0 dark-blue'>{text}</p>
                </div>
                <img src={Right} alt="arrow" className='arrow' onClick={onClick} 
                />
            </div>
            <div>
                {data?.map((e, i) =>{
                    return ( <p className="ps-5 grey" key={i}>{e?.name}</p>)
                })} 
            </div>
        </div>
</Col>
  )
}
