import { useState, useEffect } from 'react'
import './App.css'

function App() {

  const URL_FACT = "https://catfact.ninja/fact"
  const URL_BASE = "https://cataas.com/"
 

  const [fact, setFact ] = useState();
  const [ image, setImage ] = useState();
 
  useEffect(()=> {
    fetch(URL_FACT)
    .then(res => res.json())
    .then( res => setFact(res.fact))
    .catch((error)=> {
      console.error(error)
    })},[])

    useEffect(() =>  { 

      if(!fact) return
      const words =   fact.split(" ", 3).join(" ");
      fetch(`https://cataas.com/cat/cute/says/${words}?json=true`)
      .then(res => res.json())
      .then( res => setImage(res.url))
      .catch((error)=>{
        console.error(error)
      })
    }, [fact]) 
 
  return (
    
      <div>
        <h1>App</h1>
        {fact && <h2> { fact } </h2>}
        {image && <img src={`${URL_BASE}${image}`} alt='alternativo' />}
      </div>
  )
}

export default App
