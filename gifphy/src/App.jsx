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

   // Estado para los ids de los gifs favoritos
   const [favouriteIds, setFavouriteIds] = useState(["p4w0AMZJa2EtG","K0JrA2VbkFy2A"]);

   // Función para manejar el clic en el botón de favorito
   const handleFavClick = (id) => {
     if (favouriteIds.includes(id)) {
       setFavouriteIds(favouriteIds.filter(favId => favId !== id));
     } else {
       setFavouriteIds([...favouriteIds, id]);
     }
   };

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
      {gifs.map((gif) => {
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
