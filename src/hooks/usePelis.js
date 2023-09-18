import { useState, useRef, useMemo } from "react";
import { pelisResults } from "../services/movies";


export function usePelis({ query, sortBy }){
    const [ peliGet, setPeliGet ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const previousSearch = useRef(query);


    const getpelis = useMemo(() => {
      return  async ( { query }) => {
        console.log(query)
        if(query === previousSearch.current) return; 
        setLoading(true)
        setPeliGet([])
        setTimeout(async () => {
            try {
            setLoading(false)
              if (query === "") throw new Error("Escribe el nombre de tu película favorita");
              previousSearch.current = query;
              const res = await pelisResults(query);
              setPeliGet(res);
            } catch (error) {
            setLoading(false);
              throw new Error("No se encontró ninguna película");
            } finally {
              setLoading(false);
            }
          }, 1000); 
        };
    }, [] )
        
        

      const pelisSort = useMemo(()=> {
         return sortBy ? [...peliGet].sort((a, b) => a.title.localeCompare(b.title)) : peliGet;
      }, [sortBy, peliGet]);


        
        
        
    return { renderPelis : pelisSort, getpelis, loading}
    
} 

