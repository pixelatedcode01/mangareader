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
async function getPagesFromURL(chNumber) {
    return new Promise((resolve) => {
        $.ajax({
            type: 'POST',
            url: '/getChaptersFromUrl',
            contentType: 'application/json',
            data: JSON.stringify({ chapter: chNumber }),
            success: (response) => {
                resolve(response.text)
            }
        })
    })
}

// async function getTotalPages(directory, ...theArgs) {
//     return new Promise((resolve) => {
//         $.ajax({
//             type: 'POST',
//             url: '/getChapters',
//             contentType: 'application/json',
//             data: JSON.stringify({ chapter: directory }),
//             success: (response) => {
//                 resolve(response.text)
//             }
//         })
//     })
// }
let firstPage = 0


async function setLayout(pages) {
    const totalPages = pages.length;
    if (!(pagesContainer.classList.contains('double'))) {
        pagesContainer.innerHTML = ''
        // console.log(chapterNumber)
        // console.log(pages)
        for (let index = 0; index < totalPages; index++) {
            const image = document.createElement('img')
            image.classList.add('mainpage')
            image.setAttribute('src', pages[index])
            pagesContainer.appendChild(image)
        }
    }
    else {
        firstPage = 0;
        pagesContainer.innerHTML = '';
        const pageLeft = document.createElement('img');
        const pageRight = document.createElement('img');
        pageLeft.classList.add('left-page')
        pageRight.classList.add('right-page')
        pageLeft.setAttribute('src', pages[firstPage])
        pageRight.setAttribute('src', pages[firstPage + 1])
        pagesContainer.appendChild(pageLeft)
        pagesContainer.appendChild(pageRight)
        // document.querySelector('.pages').classList.toggle('double')
    }
}
let pagesList = [];
$(document).ready(async () => {
    // document.querySelector('.header').textContent = `Chapter ${chapterNumber}`
    // setLayout(pages)
    localStorage.setItem('chapter', chapterNumber)
    const pages = await getPagesFromURL(chapterNumber)
    pages.forEach((page) => {
        pagesList.push(page)
        const image = document.createElement('img')
        image.classList.add('mainpage')
        image.setAttribute('src', page)
        pagesContainer.appendChild(image)
    })
    const double = document.querySelector('.dual-page')
    double.addEventListener('click', () => {
        pagesContainer.classList.toggle('double')
        setLayout(pages)
    })
    document.addEventListener('keydown', (e) => {
        if (e.key == 'ArrowRight' & pagesContainer.classList.contains('double') & firstPage < pages.length - 2) {
            firstPage += 1
            console.log(firstPage)
            document.querySelector('.left-page').setAttribute('src', pages[firstPage])
            document.querySelector('.right-page').setAttribute('src', pages[firstPage + 1])
        }
        else if (e.key == 'ArrowLeft' & pagesContainer.classList.contains('double') & firstPage > 1) {
            firstPage -= 1
            document.querySelector('.left-page').setAttribute('src', pages[firstPage])
            document.querySelector('.right-page').setAttribute('src', pages[firstPage + 1])
        }
    })
})

