const cheerio = require('cheerio');
const axios = require('axios')
const fs = require('fs')
const url = 'https://mangaclash.com/manga/one-piece/chapter-1/'
let pagesList = []
async function load() {
    try {
        const response = await axios.get(url)
        const $ = cheerio.load(response.data)
        const pages = $('.page-break img')
        pages.each(function () {
            console.log($(this).attr('data-src'))
        })

    }
    catch (error) {
        console.log(error)
    }
}

load()
