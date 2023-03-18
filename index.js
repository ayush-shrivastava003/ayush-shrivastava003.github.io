let songs = await fetch("./tracks.json").then((res) => res.json())
let songIcons = document.getElementsByClassName("song-img")
let songUrls = document.getElementsByClassName("song-link")

// window.addEventListener("resize", (e) => console.log("d", e));
let name = document.getElementById("name")
let underline = document.getElementById("underline")
let splashImg = document.getElementById("splash-img")
let blurb = document.getElementById("splash-blurb")

let a = document.getElementById("work-item-a")
let works = await fetch("./works.json").then((res) => res.json())
let idx = 0

function run() {
    function moveSplashItems() {
        let translate = (splashImg.scrollHeight - name.offsetHeight) / 2
        translate -= (0.04 * splashImg.scrollHeight)
        underline.style.transform = `translateY(-${translate}px)`;
        underline.style.maxWidth = `${name.offsetWidth}px`
    
        // translate -= (0.2 * splashImg.scrollHeight) ? window.innerWidth < 360 : 0.35 * splashImg.scrollHeight
        if (window.innerWidth <= 1250) {
            translate -= 0.15 * splashImg.scrollHeight
        } else {
            translate -= 0.25 * splashImg.scrollHeight
        }
        let translateX = -0.5 * splashImg.scrollWidth;
        blurb.style.transform = `translate(${translateX}px, ${translate}px)`
    }
    
    moveSplashItems()
    name.style.animation = "fadein 2s ease-in-out 0s forwards"
    underline.style.animation = "open 2s ease-in-out 2.25s forwards"
    blurb.style.animation = "fadein 2s ease-in-out 4.5s forwards"
    window.addEventListener("resize", moveSplashItems)
    
    for (let i = 0; i < songs.length; i++) {
        // console.log(songs)
        // console.log(songIcons)
        songIcons[i].src = songs[i].img // TODO: show song name & artist when hovering
        songUrls[i].href = songs[i].href
    }
    moveSplashItems() // call a second time bc sometimes the blurb doesn't mv
    
    function cb(entries) {
        entries.forEach((entry) => {
            let elem = entry.target
            if (entry.isIntersecting) {
                elem.style.animation = "fadein 0.75s ease-in-out 0s forwards"
            } else {
                elem.style.animation = ""
                elem.style.opacity = "0%"
            }
        })
    }
    
    const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0
    }
    
    let observer = new IntersectionObserver(cb, options)
    
    function observe(children) {
        for (let i = 0; i < children.length; i++) {
            let child = children[i]
            child.style.opacity = "0%"
            observer.observe(child)
            if (child.children.length > 0) observe(child.children)
        }
    }
    
    let observeDivs = document.getElementsByClassName("observe")
    
    for (let i = 0; i < observeDivs.length; i++) {
        observe(observeDivs[i].children)
    }
}

if (document.readyState !== "loading") {
    run()
} else window.addEventListener("DOMContentLoaded", run)

function change(work) {
    // a.style.animation = "fadein 1s ease-in-out 0s forwards"
    a.href = work.href
    a.innerHTML = `
        <div class="work-grid-item">
            <h1 class="grid-item-h1 fade">${work.h1}</h1>
            <p class="grid-item-txt fade">${work.txt}</p>
        </div>
    `
}

function prevItem() {
    if (idx == 0) return
    idx--
    change(works[idx])
}

function nextItem() {
    if (idx == works.length - 1) return
    idx++
    change(works[idx])
}

idx++
prevItem();
document.getElementById("left-arrow").addEventListener("click", prevItem)
document.getElementById("right-arrow").addEventListener("click", nextItem)