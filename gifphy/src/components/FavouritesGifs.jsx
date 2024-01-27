import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Gif from './gif';
import getGifsById from '../services/getGifsById';

function FavouritesGifs({ favouriteIds, handleFavClick}) {
    // Filtra los gifs para obtener solo los gifs favoritos
    //const favouriteGifs = gifs.filter(gif => favouriteIds.includes(gif.id));

    const [favouriteGifs, setFavouriteGifs] = useState([])

    useEffect(() => {
        getGifsById({id: favouriteIds})
        .then(gifs => setFavouriteGifs(gifs))
    }, [favouriteIds])


    return (
        <>
            <h2>Favourite Gifs</h2>
            <div className='gifContainer'>
            {favouriteGifs.map(gif => (
                <Gif 
                key={gif.id} 
                gif={gif} 
                handleFavClick={handleFavClick} 
                isFav={true}
                title = {gif.title}
                url = {gif.url}
              />
            ))}
            {favouriteIds.length === 0 && <p>No gifs found</p> && favouriteIds !== ""}
            
        </div>
        </>
        
    );
}

FavouritesGifs.propTypes = {
    favouriteIds: PropTypes.array.isRequired,
    handleFavClick: PropTypes.func.isRequired,
};

export default FavouritesGifs;