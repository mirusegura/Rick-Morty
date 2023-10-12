import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addAllCharacters, getNext} from './redux/characterSlice'
import { BrowserRouter } from 'react-router-dom';
import PublicRoute from './routes/routes';
import { Container} from 'react-bootstrap';
import { fetchData } from './helpers/fetchData';

function App() {
  const [liveState, setLiveState] = useState("")
  const dispatch = useDispatch();
  
  useEffect(() => {
    const url = `https://rickandmortyapi.com/api/character${liveState}`
    const getData = async (url) => {
      return await fetchData(url);
    } 
    getData(url)
      .then((res) => {
        dispatch(addAllCharacters(res.data.results))
        dispatch(getNext(res.data))
      })
      .catch((err) => {console.log(err)})
  
  }, [liveState])

  const changeSearch = (type) =>{
    setLiveState(type)
  }

  return (
    <>
      <BrowserRouter>
      <Container fluid="xxl">
        <PublicRoute changeSearch={changeSearch}/>
        </Container>
      </BrowserRouter>
    </>
  )
}

export default App
