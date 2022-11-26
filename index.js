let songs = await fetch("./tracks.json").then((res) => res.json())
let songIcons = document.getElementsByClassName("song-img")
let songUrls = document.getElementsByClassName("song-link")

// window.addEventListener("resize", (e) => console.log("d", e));
let name = document.getElementById("name")
let underline = document.getElementById("underline")
let splashImg = document.getElementById("splash-img")
let blurb = document.getElementById("splash-blurb")


function resizeUnderline() {
    let translate = (splashImg.scrollHeight - name.offsetHeight) / 2
    translate -= (0.04 * splashImg.scrollHeight)
    underline.style.transform = `translateY(-${translate}px)`;

    // translate -= (0.2 * splashImg.scrollHeight) ? window.innerWidth < 360 : 0.35 * splashImg.scrollHeight
    if (window.innerWidth <= 1250) {
        translate -= 0.2 * splashImg.scrollHeight
    } else {
        translate -= 0.25 * splashImg.scrollHeight
    }
    let translateX = -0.5 * splashImg.scrollWidth;
    blurb.style.transform = `translate(${translateX}px, ${translate}px)`
}

resizeUnderline()
window.addEventListener("resize", resizeUnderline)

for (let i = 0; i < songs.length; i++) {
    console.log(songs)
    console.log(songIcons)
    songIcons[i].src = songs[i].img // TODO: show song name & artist when hovering
    songUrls[i].href = songs[i].href
}