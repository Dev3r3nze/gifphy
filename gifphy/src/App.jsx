import './App.css'
import  {useState,useEffect} from 'react'
import getGifs from './services/getGifs'
import Gif from './components/gif'

function App() {

  const [keyword, setKeyword] = useState("")
  const [num, setNum] = useState(5)

  const initialGifs = ["https://media.giphy.com/media/p4w0AMZJa2EtG/giphy.gif", "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHF4ajNpbzF6b2E3YXU4bDZ2c2U2cWE2ajNhZjhrbGJ4YnBnb2syMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MDJ9IbxxvDUQM/giphy.gif"]
  const [gifs, setGifs] = useState(initialGifs)


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
      
      <h2>Keyword</h2>
      <input type="text" id="textInput" />

      <h2>Number of gifs</h2>
      <input type="number" id="numInput" value="5"/>

      <br></br>
      <button onClick={handleSearch}>Search</button> 
      <button onClick={handleClear}>Clear</button>

      {gifs.map((singleGif, index) => {
        return <Gif key={index} title={singleGif.title} url={singleGif.url} />
      })}
    </>
  )
}


export default App
