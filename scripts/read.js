import '@material/web/button/filled-button.js';
import '@material/web/button/outlined-button.js';
import '@material/web/button/filled-tonal-button.js'
import '@material/web/button/elevated-button.js'
import '@material/web/checkbox/checkbox.js';
import '@material/web/fab/fab.js'
import '@material/web/elevation/elevation.js'
import '@material/web/dialog/dialog.js'
import '@material/web/textfield/outlined-text-field.js'
import '@material/web/radio/radio.js'

function setTheme() {
    const root = document.documentElement;
    const newTheme = root.className === 'dark' ? 'light' : 'dark';
    root.className = newTheme;
}

document.querySelector('.mode').addEventListener('click', setTheme)

const fabItems = document.querySelectorAll('.fab>div:not(.main)')
const fab = document.querySelector('.main')
const pagesContainer = document.querySelector('.pages')
const closeButton = document.querySelector('.action')
const chapterNumber = new URLSearchParams(window.location.search).get('chapter');
const pages = new URLSearchParams(window.location.search).get('pages');
closeButton.addEventListener('click', () => {
    document.querySelector('.chapter').classList.add('search-hide')
})

document.querySelector('.back-to-menu').addEventListener('click', () => {
    document.querySelector('.chapter').classList.remove('search-hide')
})

fab.addEventListener('click', () => {
    fabItems.forEach((item) => {
        item.classList.toggle('hidden')
    })
})

async function getTotalPages(directory, ...theArgs) {
    return new Promise((resolve) => {
        $.ajax({
            type: 'POST',
            url: '/getChapters',
            contentType: 'application/json',
            data: JSON.stringify({ chapter: directory }),
            success: (response) => {
                resolve(response.text)
            }
        })
    })
}
let firstPage = 1


async function setLayout(numberOfPages) {
    if (!(pagesContainer.classList.contains('double'))) {
        pagesContainer.innerHTML = ''
        // console.log(chapterNumber)
        // console.log(pages)
        for (let index = 1; index <= numberOfPages; index++) {
            const image = document.createElement('img')
            image.classList.add('mainpage')
            image.setAttribute('src', `./chapters/chapter_${chapterNumber}/Chapter${chapterNumber}_${index}.jpg`)
            pagesContainer.appendChild(image)
        }
    }
    else {
        firstPage = 1;
        pagesContainer.innerHTML = '';
        const pageLeft = document.createElement('img');
        const pageRight = document.createElement('img');
        pageLeft.classList.add('left-page')
        pageRight.classList.add('right-page')
        pageLeft.setAttribute('src', `./chapters/chapter_${chapterNumber}/Chapter${chapterNumber}_${firstPage}.jpg`)
        pageRight.setAttribute('src', `./chapters/chapter_${chapterNumber}/Chapter${chapterNumber}_${firstPage + 1}.jpg`)
        pagesContainer.appendChild(pageLeft)
        pagesContainer.appendChild(pageRight)
        // document.querySelector('.pages').classList.toggle('double')
    }
}

$(document).ready(async () => {
    // document.querySelector('.header').textContent = `Chapter ${chapterNumber}`
    setLayout(pages)
})

const double = document.querySelector('.dual-page')
double.addEventListener('click', () => {
    pagesContainer.classList.toggle('double')
    setLayout(pages)
})

document.addEventListener('keydown', (e) => {
    if (e.key == 'ArrowRight' & pagesContainer.classList.contains('double') & firstPage <= pages - 2) {
        firstPage += 1
        console.log(firstPage)
        document.querySelector('.left-page').setAttribute('src', `./chapters/chapter_${chapterNumber}/Chapter${chapterNumber}_${firstPage}.jpg`)
        document.querySelector('.right-page').setAttribute('src', `./chapters/chapter_${chapterNumber}/Chapter${chapterNumber}_${firstPage + 1}.jpg`)
    }
    else if (e.key == 'ArrowLeft' & pagesContainer.classList.contains('double') & firstPage >= 2) {
        firstPage -= 1
        document.querySelector('.left-page').setAttribute('src', `./chapters/chapter_${chapterNumber}/Chapter${chapterNumber}_${firstPage}.jpg`)
        document.querySelector('.right-page').setAttribute('src', `./chapters/chapter_${chapterNumber}/Chapter${chapterNumber}_${firstPage + 1}.jpg`)
    }
})

