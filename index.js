let songs = await fetch("./tracks.json").then((res) => res.json())
let songIcons = document.getElementsByClassName("song-img")

for (let i = 0; i < songs.length; i++) {
    console.log(songs)
    console.log(songIcons)
    songIcons[0].src = songs[0].img // TODO: show song name & artist when hovering
}