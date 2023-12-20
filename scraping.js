const axios = require('axios')

const id = 'a1c7c817-4e59-43b7-9365-09675a149a6f'
const url = `https://api.mangadex.org/manga/${id}/aggregate`;

async function fetch() {
    let latest;
    const data = await axios.get(url)
    const chapters = data.data['volumes']['none']['chapters']
    for (const key in chapters) {
        latest = key
    }
    console.log(latest)
}

fetch()
