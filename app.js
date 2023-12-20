const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const { resolve } = require('path');
const cheerio = require('cheerio');
const axios = require('axios')
const id = 'a1c7c817-4e59-43b7-9365-09675a149a6f'
const mainUrl = `https://api.mangadex.org/manga/${id}/aggregate`;

// app.use(bodyParser.json());
app.use(express.static('./'))
app.use(express.json());
function getChaptersLength(directory) {
    return new Promise((resolve) => {
        fs.readdir(directory, (err, files) => {
            resolve(files.length)
        })
    })
}
function getChaptersList() {
    let latest;
    return new Promise(async (resolve) => {
        const data = await axios.get(mainUrl)
        const chapters = data.data['volumes']['none']['chapters']
        for (const key in chapters) {
            latest = key
        }
        resolve(latest)
    })
}
function getPages(chNumber) {
    const pagesList = []
    return new Promise(async (resolve) => {
        const url = `https://mangaclash.com/manga/one-piece/chapter-${chNumber}`
        const response = await axios.get(url)
        const $ = cheerio.load(response.data)
        const pages = $('.page-break img')
        pages.each(function () {
            link = $(this).attr('data-src');
            pagesList.push(link)
        })
        resolve(pagesList)
    })
}

app.post('/getChapters', async (req, res) => {
    const directory = req.body.chapter;
    const result = await getChaptersLength(directory);
    res.json({ text: result })
})
app.post('/getChaptersFromUrl', async (req, res) => {
    const chNumber = req.body.chapter;
    const result = await getPages(chNumber);
    res.json({ text: result });
})

app.get('/getTotalChapters', async(req, res) => {
    const result = await getChaptersList();
    res.json({text : result});
})


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
