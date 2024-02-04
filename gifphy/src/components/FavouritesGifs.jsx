import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Gif from "./gif";
import getGifsById from "../services/getGifsById";

function FavouritesGifs({ favouriteIds, handleFavClick}) {
  // Filtra los gifs para obtener solo los gifs favoritos
  //const favouriteGifs = gifs.filter(gif => favouriteIds.includes(gif.id));

  // Estado para los ids de los gifs favoritos
  const [favouriteGifs, setFavouriteGifs] = useState([]);

  

  // Guardamos los favoritos en localStorage cuando cambia el estado
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favouriteIds));
  }, [favouriteIds]);

  useEffect(() => {
    getGifsById({ id: favouriteIds }).then((gifs) => setFavouriteGifs(gifs));
  }, [favouriteIds]);

  

  return (
    <>
      <h2>Favourite Gifs</h2>
      <div className="gifContainer">
        {favouriteGifs.map((gif) => (
          <Gif
            key={gif.id}
            gif={gif}
            handleFavClick={handleFavClick}
            isFav={true}
            title={gif.title}
            url={gif.url}
          />
        ))}
        {favouriteGifs.length == 0 && <p>No favourite gifs yet</p>}
      </div>
    </>
  );
}

FavouritesGifs.propTypes = {
  favouriteIds: PropTypes.array.isRequired,
  handleFavClick: PropTypes.func.isRequired,
};

export default FavouritesGifs;
