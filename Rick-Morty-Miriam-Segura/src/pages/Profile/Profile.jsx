import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Button } from 'react-bootstrap';
import { getCurrentCharacter } from '../../redux/characterSlice';
import location from '../../assets/images/location_on.svg';
import videocam from '../../assets/images/videocam.svg'
import { useNavigate, useParams } from "react-router-dom";
import { fetchData } from "../../helpers/fetchData";

import { Dropdown } from "../../components/dropdown/dropdown";


export function Profile() {
  
  const [dataEpisodes, setDataEpisodes] = useState([])
  const [isActiveEpisodes, setIsActiveEpisodes] = useState(false);
  const [isActiveLocation, setIsActiveLocation] = useState(false);
  const { characters,  currentCharacter } = useSelector((state) => state.character)

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {id} = useParams();
  useEffect(()=>{
      let character = characters.find(e=>e.id === Number(id))
      dispatch(getCurrentCharacter(character))
  },[characters])
    
  // Function to obtain information from accumulated promises of all episodes.
  useEffect(()=>{
    const fetchingData = async() => {
      const getEpisodes = async(array)=>{
          let temp = array?.map(async(e)=>{
            let data = await fetchData(e);
            return data.data
          })
          return temp
        }
        let res = getEpisodes(currentCharacter.episode)
          res.then((res)=>Promise.all(res).then((res)=>setDataEpisodes(res)));
      }

      fetchingData().catch((err)=>console.log(err))
    
    },[currentCharacter])

    const toggleClassEpisodes = () => {
        setIsActiveEpisodes(!isActiveEpisodes);
      };
    const toggleClassLocation = () => {
        setIsActiveLocation(!isActiveLocation);
      };

  return (
    <>
    <Row className="profile">
      <Col className="d-flex justify-content-start justify-content-md-center  align-items-center flex-row flex-md-column">
      <img src={currentCharacter?.image} alt="character profile photo" />
      <div className="ms-3 ms-md-0 d-flex flex-column align-items-md-center align-items-start">
        <p className="title mb-0">{currentCharacter?.name}</p>
        <p className="info mb-0">
            <span 
              className={`${
                currentCharacter?.status==="Alive" ? 'alive status' : 'status'
              } ${
                currentCharacter?.status==="Dead" ? 'dead status' : 'status'
              } `} 
              >{currentCharacter?.status}
            </span><span> | </span><span>{currentCharacter?.species}</span> | <span>{currentCharacter?.gender}</span>
      </p>
      </div>
      </Col>
      <Row>
        <Dropdown 
          data={[currentCharacter?.location]} 
          onClick={toggleClassLocation} 
          open={isActiveLocation}
          image={location}
          text={"Locations"}
        />
        <Dropdown 
          data = {dataEpisodes} 
          onClick={toggleClassEpisodes} 
          open={isActiveEpisodes}
          image={videocam}
          text={"Episodes"}
          />
        </Row> 
         <Button  onClick={()=>navigate(-1)} className="m-auto">Back</Button>
    </Row>
    </>
  );
}