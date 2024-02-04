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

  const [lastsSearchs, setLastsSearchs] = useState([])
  // Función de estado inicial para cargar los favoritos del localStorage
  const loadFavs = () => {
    const favs = localStorage.getItem("favourites");
    return favs ? JSON.parse(favs) : [];
  };
  const [favouriteIds, setFavouriteIds] = useState(loadFavs);


  // Función para manejar el clic en el botón de favorito
  const handleFavClick = (id) => {
    setFavouriteIds((currentFavs) => {
      if (currentFavs.includes(id)) {
        return currentFavs.filter((favId) => favId !== id);
      } else {
        return [...currentFavs, id];
      }
    });
  };
  
  // "p4w0AMZJa2EtG","K0JrA2VbkFy2A"

  

  useEffect(() => {
    getGifs({keyword: keyword, n: num})
    .then(gifs => setGifs(gifs))
  }, [keyword, num])


  function handleSearch() {
    const textInput = document.getElementById("textInput")
    const numInput= document.getElementById("numInput")
    if(textInput.value === "") return
    if(lastsSearchs.length >= 5){
      lastsSearchs.shift()
    }
    if(lastsSearchs[lastsSearchs.length-1] === textInput.value) return
    setLastsSearchs([...lastsSearchs, textInput.value])
    
    setNum(numInput.value)
    setKeyword(textInput.value)
  }
  function handleClear(){
    setKeyword("")
    document.getElementById("textInput").value = ""
    document.getElementById("numInput").value = 5
  }
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  function selectSearch(e){
    setKeyword(e.target.innerText)
    document.getElementById("textInput").value = e.target.innerText
  }
  function clearLastsSearchs(){
    setLastsSearchs([])
  }

  return (
    <>
      <h1>Search Gifs</h1>
      
      <form className='gifForm' onSubmit={handleSubmit}>
        <h2>Keyword</h2>
        <input type="text" id="textInput"/>
        <ul className='lastsSearchsContainer'>
        {lastsSearchs.length > 0 &&  <h2>Lasts searches</h2>}
        {[...lastsSearchs].reverse().map((search, index) => (
          <li key={index} onClick={selectSearch} className='lastSearchText'>{search}</li>
        ))}
          {lastsSearchs.length > 0 && <button type="button" onClick={clearLastsSearchs} className='smallBtn'>Clear</button>}
      </ul>

        <h2>Number of gifs</h2>
        <input type="number" id="numInput" placeholder="5" defaultValue={5}/>

        <br></br>
        <button type="submit" onClick={handleSearch}>Search</button> 
        <button type="button" onClick={handleClear}>Clear</button>
      </form>

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

      <FavouritesGifs favouriteIds={favouriteIds} handleFavClick={handleFavClick}/>


    </>
  )
}


export default App


/// Pendiente
// 2. Historial de búsquedas
// 3. Historial de gifs vistos
// 4. Botón de deshacer (undo)

/// Avanzado
// 1. Crear una página de detalle de un gif
// 2. Que el usuario pueda crear carpetas con sus favoritos
// 3. Que el usuario pueda compartir gifs