import './App.css'
import { usePelis } from './hooks/usePelis'
import noResults from "./mocks/noResults.json"
import { useRef, useState, useCallback } from 'react';
import debounce from "just-debounce-it"


function App() {

  
 
 const inputReference = useRef();
 const [query, setQuery ] = useState({});
 const [ errors, setErrors ] = useState({});
 const [ sortBy, setSortBy ] = useState(false)
 const { renderPelis, getpelis, loading } = usePelis({ query, sortBy });

  const newSearch = useCallback(debounce((query) => {
    getpelis(query);
  }, 350), [getpelis]);
  

  const handleSort = ()=>{
    setSortBy(!sortBy)
  }

  const handleSubmit = (event) =>{
    event.preventDefault();
    getpelis({ query } )

  }
 const validation = (query)=>{
  if(query.name.length < 3 ){
    setErrors({ error: "Debe tener al menos 3 caracteres"})
    return
  } else  {
    setErrors({});
  }
  
 }

 const handleChange = (event)=> {
  event.preventDefault();
  const newQuery = { name : event.target.value } ;
  setQuery(newQuery);
  validation(newQuery);
  newSearch({ query : newQuery });

 }

 
 

  return (
    <div className='contenedor'>
      <header>
        <h1>
          Buscador de peliculas
        </h1>
        <form  onSubmit={handleSubmit} className={"form"} action="">
          <input  onChange={handleChange} ref={inputReference} type="text" placeholder='Search' />
          <button type='submit'> Buscar </button>
          <div>
            <label htmlFor=""> Ordenar por titulo </label>
            <input type="checkbox" onChange={handleSort} />

          </div>
        </form>
        { 
        errors.error ? <span style={{color: "red"}}> {errors.error } </span> : ""
        }
      </header>
      <main>
        <section className='section'>
          <ul className='pelisContainer'>
            {
              loading  ? <h1> Cargando ... </h1> :
              renderPelis ? renderPelis.map(peli => { 
                return(
                  <li key={peli.id} className='peli'>
                    <h3> title: {peli.title} </h3>
                    <h3> title: {peli.year} </h3>
                    <h3> title: {peli.type} </h3>
                    <img src={peli.poster} alt={peli.title} />

                  </li>
                ) 
              }) : noResults.Error
            }
          </ul>
        </section>
      </main>
        
    </div>
  )
}

export default App
