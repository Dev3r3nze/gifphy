import './App.css'
import  {useState,useEffect} from 'react'
import getGifs from './services/getGifs'
import Gif from './components/gif'

function App() {



  const initialGifs = ["https://media.giphy.com/media/p4w0AMZJa2EtG/giphy.gif", "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHF4ajNpbzF6b2E3YXU4bDZ2c2U2cWE2ajNhZjhrbGJ4YnBnb2syMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MDJ9IbxxvDUQM/giphy.gif"]
  const [gifs, setGifs] = useState(initialGifs)


  useEffect(() => {
    getGifs({keyword: "vinland saga"})
    .then(gifs => setGifs(gifs))
  }, [])

  return (
    <>
      <h1>Gifs</h1>
      {gifs.map((singleGif, index) => {
        return <Gif key={index} title={singleGif.title} url={singleGif.url} />
      })}

    </>
  )
}

export default App
