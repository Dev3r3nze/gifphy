const apiKey = "Enrzwdg2ABPVvhBcMCSLYigpV0CoD3pz"

export default function getGifsByUrl({id}) {
    // Api: https://api.giphy.com/v1/gifs?api_key=Enrzwdg2ABPVvhBcMCSLYigpV0CoD3pz&ids=p4w0AMZJa2EtG%2CK0JrA2VbkFy2A&rating=g
    const apiURL = `https://api.giphy.com/v1/gifs?api_key=${apiKey}&ids=${id}&rating=g`
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