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
import '@material/web/textfield/filled-text-field.js'
import '@material/web/textfield/outlined-text-field.js'
function goToChapter(chapter) {
    chapter.addEventListener('click', async () => {
        const value = chapter.getAttribute('data-value');
        window.location.href = 'read.html?chapter=' + encodeURIComponent(value);
    });
}

function setTheme() {
    const root = document.documentElement;
    const newTheme = root.className === 'dark' ? 'light' : 'dark';
    root.className = newTheme;
}


// const div = document.createElement('div')
// const dbutton = document.createElement('div')
// const p = document.createElement('p')
// const mButton = document.createElement('md-filled-button')
// mButton.textContent = 'Read Now'

// div.classList.add('text-container')
// p.classList.add('heading')
// p.textContent = 'Hello'
// dbutton.classList.add('button')
// dbutton.appendChild(mButton)

// div.appendChild(p)
// div.appendChild(dbutton)


document.querySelector('.mode').addEventListener('click', setTheme)

const menu = document.querySelector('.menu')
menu.addEventListener('click', () => {
    document.querySelector('.sidebar').classList.toggle('menu-toggle')
})


const carousel = document.querySelectorAll('.carousel>div')
console.log(carousel)


carousel.forEach((item) => {
    item.addEventListener('mouseover', () => {
        carousel.forEach((img) => {
            if (img.classList.contains('active')) {
                img.classList.remove('active')
                img.classList.add('inactive')
            }
        })
        item.classList.remove('inactive')
        item.classList.add('active')
    })
})

const itemsContainer = document.querySelector('.items')

const items = document.querySelectorAll('.items > p')
const searchBar = document.querySelector('.searchbar')

searchBar.addEventListener('input', () => {
    const value = searchBar.value
    const re = `^${value}\\d*`
    items.forEach((item) => {
        if (item.getAttribute('data-value').match(re) == item.getAttribute('data-value')) {
            item.classList.remove('hidden')
        }
        else {
            item.classList.add('hidden')
            console.log('no')
        }
    })
})
function drawChapters(number) {
    for (let i = number; i >= 1; i--) {
        const p = document.createElement('p')
        p.setAttribute('data-value', `${i}`)
        p.textContent = `Chapter ${i}`
        itemsContainer.appendChild(p)
    }
}
function getChapters() {
    return new Promise((resolve) => {
        chapters = document.querySelectorAll('.items>p')
        resolve(chapters)
    })
}
// function getTotalPages(directory, ...theArgs) {
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
function getTotalChapters(){
    return new Promise((resolve) => {
        $.ajax({
            type:'GET',
            url:'/getTotalChapters',
            success:(response)=>{
                resolve(response.text)
            }
        })
    })
}

$(document).ready(
    async function getNumberOfChapters() {
        const chaptersLength = await getTotalChapters()
        console.log(chaptersLength)
        // const number = await getTotalPages('./chapters/')
        drawChapters(chaptersLength)
        const chapters = await getChapters()
        chapters.forEach((chapter) => {
            chapter.addEventListener('click', goToChapter(chapter));
        });
        const carouselItems = document.querySelectorAll('.carousel div')
        let heading = chaptersLength
        carouselItems.forEach((item) => {
            item.setAttribute('data-value', heading)
            const h1 = document.createElement('h1')
            h1.textContent = `Chapter ${heading}`
            item.appendChild(h1)
            heading -= 1
            item.addEventListener('click', goToChapter(item))
        })
        const items = document.querySelectorAll('.items > p')
        const searchBar = document.querySelector('.searchbar')

        searchBar.addEventListener('input', () => {
            const value = searchBar.value
            const re = `^${value}\\d*`
            items.forEach((item) => {
                if (item.getAttribute('data-value').match(re) == item.getAttribute('data-value')) {
                    item.classList.remove('hidden')
                }
                else {
                    item.classList.add('hidden')
                    console.log('no')
                }
            })
        })

        // const latest = document.querySelectorAll('.latest')
        // console.log(latest)
        // latest.forEach((item)=>{
        //     item.style.background = `url('/chapters/chapter_${number}/Chapter${number}_1.jpg')`
        // })
    }
)


