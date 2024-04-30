// window.addEventListener("resize", (e) => console.log("d", e));
let name = document.getElementById("name")
let splashImg = document.getElementById("splash-img")

let a = document.getElementById("work-item-a")
let works = await fetch("./works.json").then((res) => res.json())
let idx = 0

function run() {
    function cb(entries) {
        entries.forEach((entry) => {
            let elem = entry.target
            if (entry.isIntersecting) {
                if (elem.className == "name") splashImg.style.filter = "brightness(30%) grayscale(100%)";
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
// const seconds = document.getElementById("seconds")
// const minutes = document.getElementById("minutes")
// const hours = document.getElementById("hours")
let scroll = 0
let vpHeight = window.innerHeight;
// console.log(nameContainer.scrollHeight * 2)

// for (let i = 0; i < 6; i++) {
//     let s = document.createElement("p")
//     s.innerText = "."
//     seconds.appendChild(s)

//     let m = document.createElement("p")
//     m.innerText = "."
//     minutes.appendChild(m)

//     let h = document.createElement("p")
//     h.innerText = "."
//     hours.appendChild(h)
// }

// for (let i = 0; i < 6; i++) {
//     let h = document.createElement("p")
//     h.innerText = "."
//     hours.appendChild(h)
// }

window.addEventListener('wheel', (e) => {
    scroll = Math.min(nameContainer.scrollHeight * 4, Math.max(scroll + e.deltaY, 0));
    let ncHeight = nameContainer.getBoundingClientRect().bottom
    let progress = Math.min(1, Math.max(0, 1 - ((scroll - (0.15 * vpHeight)) / ncHeight)));
    nameContainer.style.opacity = progress;
}, {passive: false})

const dateTime = document.getElementById("date-time")
dateTime.innerText = new Date().toLocaleDateString(
    'en-us', {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "2-digit"
    }).toUpperCase()

// let d = new Date()
// let s = d.getSeconds();
// s = ((s - (s % 10)) / 10)
// let m = d.getMinutes();
// m = ((m - (s % 10)) / 10)
// let h = d.getHours();
// h = ((h > 11) ? h - 12: h)
// console.log(h)

// function updateSeconds() {
//     if (s > 6) {
//         for (let i = 0; i < s; i++) seconds.childNodes[i].style = "";
//         s = 0;
//         return;
//     }

//     for (let i = 0; i < s; i++) seconds.childNodes[i].style = "font-weight: bold;";
//     s++;
// }

// function updateMinutes() {
//     if (m > 6) {
//         for (let i = 0; i < m; i++) minutes.childNodes[i].style = "";
//         m = 0;
//         return;
//     }

//     for (let i = 0; i < m; i++) minutes.childNodes[i].style = "font-weight: bold;";
//     m++;
// }

// function updateHours() {
//     if (h > 11) {
//         for (let i = 0; i < h; i++) hours.childNodes[i].style = "";
//         h = 0;
//         return;
//     }

//     for (let i = 0; i < h; i++) hours.childNodes[i].style = "font-weight: bold;";
//     h++;
// }

// updateSeconds(); updateMinutes(); updateHours();
// setInterval(updateSeconds, 10000)
// setInterval(updateMinutes, 60000)
// setInterval(updateHours, 3600000)
