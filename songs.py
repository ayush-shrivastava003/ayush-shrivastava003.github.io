import spotipy
from spotipy.oauth2 import SpotifyOAuth
from json import dumps
import schedule
import os
import time

scope = "user-top-read"
sp = spotipy.Spotify(auth_manager=SpotifyOAuth(scope=scope))

def update():
    print("update!!!")
    with open("tracks.json", "w") as f:
        all = []
        for track in sp.current_user_top_tracks(limit=3, offset=0, time_range='short_term')["items"]:
            song_info = {
                "img": track["album"]["images"][0]["url"],
                "name": track["name"],
                "artist": track["artists"][0]["name"]
            }
            all.append(song_info)

        f.write(dumps(all))
    
    os.system('git commit -am "auto update: refresh songs" && git push')

schedule.every(2).minutes.do(update)
update()
while True:
    schedule.run_pending()