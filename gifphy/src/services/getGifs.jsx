const apiKey = "Enrzwdg2ABPVvhBcMCSLYigpV0CoD3pz"

export default function getGifs({keyword = "cat",n = 5}) {
    const apiURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${keyword}&limit=${n}&offset=0&rating=g&lang=en&bundle=messaging_non_clips`
    
    return fetch(apiURL)
    .then(res => res.json())
    .then(res => {
        const {data} = res
        const gifs = data.map(image => {
            const {title, images, id} = image
            const {url} = images.original
            return {title, url, id}
        })
        return gifs
    })
}