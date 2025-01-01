import { clientId } from "../../constants";

export function getAuthUrl() {
  const loaclUrl = "http://localhost:3000";

  const scopes = [
    "ugc-image-upload",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "user-read-private",
    "user-read-email",
    "user-library-modify",
    "user-library-read",
    "user-top-read",
    "user-read-recently-played",
    "playlist-modify-private",
    "playlist-read-private",
    "playlist-modify-public",
    "playlist-read-collaborative",
    "app-remote-control",
    "streaming",
    "user-follow-modify",
    "user-follow-read",
  ];

  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${loaclUrl}/&scope=${scopes.join("%20")}`;
  return AUTH_URL;
}
