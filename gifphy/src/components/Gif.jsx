import PropTypes from "prop-types";

export default function Gif({ gif, handleFavClick, isFav, url, title}) {
    
    return (
        <div className="gif">
            <img src={url} alt={title} />
            {/*<p>{title}</p>*/}
            <button onClick={() => handleFavClick(gif.id)} className="favBtn">
                {isFav ? '-' : '+'}
            </button>
        </div>
    );
}

Gif.propTypes = {
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    handleFavClick: PropTypes.func.isRequired,
    isFav: PropTypes.bool.isRequired,
    gif: PropTypes.object.isRequired,
}