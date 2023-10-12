import { useDispatch, useSelector } from "react-redux";
import { CardCharacter } from "../../components/card/Card";
import { Navbar } from '../../components/navbar/Navbar';
import { Col, Row } from "react-bootstrap";
import { addAllCharacters, addCont, getNext } from "../../redux/characterSlice";
import { useState } from "react";
import { fetchData } from "../../helpers/fetchData";

export function Home({changeSearch}) {

  const black = "rgba(38, 38, 38, 1)";
  const blueText = "rgba(51, 160, 255, 1)";

  const [option, setOption] = useState([
    {id:1, text:"All", color:blueText, border:"3px solid rgba(51, 160, 255, 1)", url:""},
    {id:2, text:"Alive", color:black, border:"none", url:"?status=alive"},
    {id:3, text:"Dead", color:black, border:"none", url:"?status=dead"},
    {id:4, text:"Unknown", color:black, border:"none", url:"?status=unknown"},
  ]);
  

  const {characters, cont, next} = useSelector((state) => state.character )

  const dispatch = useDispatch()

  const loadMore = () =>{
    dispatch(addCont())
    let contTemp = cont + 1
    if(next){
      if((characters.length / (contTemp * 8)) <= 1){
        let data = fetchData(next)
        data.then((res)=>{
          let temp = [...characters, ...res.data.results]
          dispatch(addAllCharacters(temp))
            dispatch(getNext(res.data))
        }
        )
      }
    }
}

  const handleClick = (id, url) => {
    const newOption = option.map((e) => {
      if(e.id === id) {
        return {...e,color:blueText, border:`3px solid ${blueText}`}
      } else {
        return {...e,color:black, border:"none"}
      }
    })
    changeSearch(url)
    setOption(newOption)
  }

  return (
      <>
      <header>
      <Navbar />
      </header>
      <main>
      <Row className="home pt-0">
        <div className="d-flex justify-content-center  ">
          {option.map((e) => {
            return (
              <div
                className="mx-3 pointer" 
                key={e.id} 
                style={{color:e.color, borderBottom:e.border}} 
                onClick={()=> handleClick(e.id, e.url)}
                >{e.text}
                </div>
            )
          })}
        </div>
        {characters.map((char, i) => {
          if(i < 8 * cont){
            return (
              <Col xs={6} md={3} className="home_col" key={i}>
                <CardCharacter character={char} />
            </Col>
          )
        }
        })}
      </Row>
      <Row>
        <Col onClick={loadMore} className="load_button"> 
          {next && <p>Load More</p>}
        </Col>
      </Row>
      <Row className="d-block d-sm-none">
        <Col>  
          <hr />
        </Col>
      </Row>
      </main>
      </>
    );
  }
  