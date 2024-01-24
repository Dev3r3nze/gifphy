import PropTypes from "prop-types";

export default function Gif({ title, url }) {
    return (
        <div>
        <img src={url} alt={title} />
        <p>{title}</p>
        </div>
    );
}

Gif.propTypes = {
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
};
    