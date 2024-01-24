const apiKey = "Enrzwdg2ABPVvhBcMCSLYigpV0CoD3pz"

export default function getGifs({keyword = "cat"}) {
    const apiURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${keyword}&limit=5&offset=0&rating=g&lang=en&bundle=messaging_non_clips`
    
    return fetch(apiURL)
    .then(res => res.json())
    .then(res => {
        const {data} = res
        const gifs = data.map(image => {
            const {title, images} = image
            const {url} = images.original
            return {title, url}
        })
        return gifs
    })
}