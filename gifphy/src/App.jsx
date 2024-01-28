import './App.css'
import  {useState,useEffect} from 'react'
import getGifs from './services/getGifs'
import Gif from './components/gif'
import FavouritesGifs from './components/FavouritesGifs'

function App() {

  const [keyword, setKeyword] = useState("")
  const [num, setNum] = useState(5)

  const initialGifs = ["https://media.giphy.com/media/p4w0AMZJa2EtG/giphy.gif", "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHF4ajNpbzF6b2E3YXU4bDZ2c2U2cWE2ajNhZjhrbGJ4YnBnb2syMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MDJ9IbxxvDUQM/giphy.gif"]
  const [gifs, setGifs] = useState(initialGifs)

  // Función de estado inicial para cargar los favoritos del localStorage
  const loadFavs = () => {
    const favs = localStorage.getItem('favourites');
    return favs ? JSON.parse(favs) : [];
  };

  // Estado para los ids de los gifs favoritos
  const [favouriteIds, setFavouriteIds] = useState(loadFavs);
  // "p4w0AMZJa2EtG","K0JrA2VbkFy2A"

  // Función para manejar el clic en el botón de favorito
  const handleFavClick = (id) => {
    setFavouriteIds((currentFavs) => {
      if (currentFavs.includes(id)) {
        return currentFavs.filter(favId => favId !== id);
      } else {
        return [...currentFavs, id];
      }
    });
  };

  // Guardamos los favoritos en localStorage cuando cambia el estado
  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favouriteIds));
  }, [favouriteIds]);

  useEffect(() => {
    getGifs({keyword: keyword, n: num})
    .then(gifs => setGifs(gifs))
  }, [keyword, num])


  function handleSearch() {
    const textInput = document.getElementById("textInput")
    const numInput= document.getElementById("numInput")
    setNum(numInput.value)
    setKeyword(textInput.value)
  }
  function handleClear(){
    setKeyword("")
    document.getElementById("textInput").value = ""
    document.getElementById("numInput").value = 5
  }

  return (
    <>
      <h1>Search Gifs</h1>
      
      <div className='gifForm'>
        <h2>Keyword</h2>
        <input type="text" id="textInput" />

        <h2>Number of gifs</h2>
        <input type="number" id="numInput" placeholder="5" defaultValue={5}/>

        <br></br>
        <button onClick={handleSearch}>Search</button> 
        <button onClick={handleClear}>Clear</button>
      </div>

      <div className='gifContainer'>
      {gifs.length > 0 && gifs.map((gif) => {
        return <Gif 
        key={gif.id} 
        gif={gif} 
        handleFavClick={handleFavClick} 
        isFav={favouriteIds.includes(gif.id)}
        title = {gif.title}
        url = {gif.url}
      />
      })}
      {gifs.length === 0 && <p>No gifs found</p> && keyword !== ""}
      </div>

      {favouriteIds.length > 0 && <FavouritesGifs favouriteIds={favouriteIds} handleFavClick={handleFavClick}/>}


    </>
  )
}


export default App


/// Pendiente
// 1. Mantener favs al recargar la página
// 2. Historial de búsquedas
// 3. Historial de gifs vistos
// 4. Botón de deshacer (undo)

/// Avanzado
// 1. Crear una página de detalle de un gif
// 2. Que el usuario pueda crear carpetas con sus favoritos
// 3. Que el usuario pueda compartir gifs