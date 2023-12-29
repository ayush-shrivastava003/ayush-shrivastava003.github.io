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
    function cb(entries) {
        entries.forEach((entry) => {
            let elem = entry.target
            if (entry.isIntersecting) {
                // elem.style.animation = "fadein 0.75s ease-in-out 0s forwards"
                console.log("INTERSECT");
                // console.log(document.getElementById("splash-img").style);
                splashImg.style.filter = "brightness(30%) grayscale(100%)";
            } else {
                // elem.style.animation = ""
                // elem.style.opacity = "0%"
                splashImg.style.filter = "brightness(15%) grayscale(100%)"
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
            // child.style.opacity = "0%"
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

const nameContainer = document.getElementById("name-container")
let trait1 = document.getElementById("trait1")
let trait2 = document.getElementById("trait2")
let trait3 = document.getElementById("trait3")
let scroll = 0
const t1Unit = 8.8/66.66666412353516
const t3Unit = 7.5/66.66666412353516 // in %
const t2Unit = -6.5/66.66666412353516
const duration = 200
let vpHeight = window.innerHeight;

window.addEventListener('wheel', (e) => {
    scroll = Math.min(Math.max(scroll + e.deltaY, 0), 3700);
    let ncHeight = nameContainer.getBoundingClientRect().bottom
    let progress = 1 - ((scroll - (0.15 * vpHeight)) / ncHeight);
    console.log(scroll, ncHeight, scroll / ncHeight, progress, window.innerHeight - ncHeight);
    nameContainer.style.opacity = progress;
    let t1Left = t1Unit * Math.max(scroll - 125, 0);
    let t3Left = t3Unit * Math.max(scroll - 125, 0);
    let t2Left = t2Unit * Math.max(scroll - 125, 0);
    // console.log(left);
    trait1.animate(
        [{transform: `translate(${t1Left}%, 60%)`}], {
        duration,
        iterations: 1,
        ease: "ease-in-out"
    })

    trait2.animate(
        [{transform: `translate(${t2Left}%, 5%`}], {
        duration,
        iterations: 1,
        ease: "ease-in-out"
    })

    trait3.animate(
        [{transform: `translate(${t3Left}%,-60%`}], {
        duration,
        iterations: 1,
        ease: "ease-in-out"
    })

    trait1.style.transform = `translate(${t1Left}%,60%)`
    trait2.style.transform = `translate(${t2Left}%, 5%)`
    trait3.style.transform = `translate(${t3Left}%,-60%)`
}, {passive: false})

