
export const pelisResults = async (query) => {
     
    try {
        if(query.name){ 
            const peli = query.name;
            const res = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=2d101008&s=${peli}`)
            const response = await res.json()
            const respuesta = response.Search?.map(peli => ({
                id: peli.imdbID,
                title: peli.Title,
                poster: peli.Poster,
                type: peli.Type,
                year: peli.Year
        }))
            return respuesta;
         }
        
    } catch (error) {
        throw new Error("No se encontraron coincidencias")
    }
    
      
    
}
/* 

    const Peliculas = peliGet?.map(peli => ({
            id: peli.imdbID,
            title: peli.Title,
            poster: peli.Poster,
            type: peli.Type,
            year: peli.Year
    }));*/