// window.addEventListener("resize", (e) => console.log("d", e));
let name = document.getElementsByClassName("name")[0]
let splashImg = document.getElementById("splash-img")

let a = document.getElementById("work-item-a")
let works = await fetch("./works.json").then((res) => res.json())
let idx = 0

function run() {
    function cb(entries) {
        entries.forEach((entry) => {
            let elem = entry.target
            if (entry.isIntersecting) {
                if (elem.className == "name") return;
                else elem.style.animation = "fadein 0.75s ease-in-out 0s forwards"
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
let scroll = 0
let vpHeight = window.innerHeight;


window.addEventListener('wheel', (e) => {
    scroll = Math.min(nameContainer.scrollHeight * 4, Math.max(scroll + e.deltaY, 0));
    let ncHeight = nameContainer.getBoundingClientRect().bottom
    let progress = Math.min(1, Math.max(0, 1 - ((scroll - (0.15 * vpHeight)) / ncHeight)));
    nameContainer.style.opacity = progress;
    name.style.opacity = progress;
}, {passive: false})

const dateTime = document.getElementById("date-time")
dateTime.innerText = new Date().toLocaleDateString(
    'en-us', {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "2-digit"
    }).toUpperCase()

let videoIdx = 0;
splashImg.addEventListener("ended", () => {
    videoIdx == 1 ? videoIdx = 0 : videoIdx++;
    splashImg.src = `nyc${videoIdx}.mp4`;
    splashImg.load();
    splashImg.play();
}, false)