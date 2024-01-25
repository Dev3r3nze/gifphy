import PropTypes from 'prop-types';

function FavouritesGifs({ gifs, favouriteIds }) {
    // Filtra los gifs para obtener solo los gifs favoritos
    const favouriteGifs = gifs.filter(gif => favouriteIds.includes(gif.id));

    return (
        <>
            <h2>Favourite Gifs</h2>
            <div className='gifContainer'>
            {favouriteGifs.map(gif => (
                <div key={gif.id} className='gif'>
                    <img src={gif.url} alt={gif.title} />
                </div>
            ))}
        </div>
        </>
        
    );
}

FavouritesGifs.propTypes = {
    gifs: PropTypes.array.isRequired,
    favouriteIds: PropTypes.array.isRequired,
};

export default FavouritesGifs;