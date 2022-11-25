let songs = await fetch("./tracks.json").then((res) => res.json())
let songIcons = document.getElementsByClassName("song-img")
let songUrls = document.getElementsByClassName("song-link")

for (let i = 0; i < songs.length; i++) {
    console.log(songs)
    console.log(songIcons)
    songIcons[i].src = songs[i].img // TODO: show song name & artist when hovering
    songUrls[i].href = songs[i].href
}