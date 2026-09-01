import base64
import json
import os
import re
import urllib.parse
import urllib.request

CLIENT_ID = os.environ.get("SPOTIFY_CLIENT_ID")
CLIENT_SECRET = os.environ.get("SPOTIFY_CLIENT_SECRET")
REFRESH_TOKEN = os.environ.get("SPOTIFY_REFRESH_TOKEN")

def get_access_token():
    data = urllib.parse.urlencode({
        "grant_type": "refresh_token",
        "refresh_token": REFRESH_TOKEN,
    }).encode()

    req = urllib.request.Request("https://accounts.spotify.com/api/token", data=data)
    auth = base64.b64encode(f"{CLIENT_ID}:{CLIENT_SECRET}".encode()).decode()
    req.add_header("Authorization", f"Basic {auth}")

    try:
        with urllib.request.urlopen(req) as response:
            return json.load(response)["access_token"]
    except urllib.error.HTTPError as e:
        print(e.read().decode())
        raise


def get_recently_played(access_token):
    #asks for 5 most recently played songs
    req = urllib.request.Request("https://api.spotify.com/v1/me/player/recently-played?limit=5")
    # adds the access token to the request header for authorization
    req.add_header("Authorization", f"Bearer {access_token}")

    #loads json with 5 songs
    with urllib.request.urlopen(req) as response:
        return json.load(response)

def main():
    access_token = get_access_token()
    raw = get_recently_played(access_token)
    tracks = []
    for item in raw.get('items', []):
        track = item['track']
        images = track['album']['images']
        tracks.append({
            'name': track['name'],
            'artist': ', '.join(a['name'] for a in track['artists']),
            'album_art': images[0]['url'] if images else None,
            'url': track['external_urls']['spotify'],
            'played_at': item['played_at'],
        })

    with open('assets/spotify.json', 'w') as f:
        json.dump(tracks, f, indent=2)

if __name__ == "__main__":
    main()