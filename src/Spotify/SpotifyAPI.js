import querystring from "querystring";

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.REACT_APP_REFRESH_TOKEN;

const getAccessToken = async () => {
    const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
    const response = await fetch(TOKEN_ENDPOINT, {
        method: "POST",
        headers: {
            Authorization: `Basic ${basic}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: querystring.stringify({
            grant_type: "refresh_token",
            REFRESH_TOKEN,
        }),
    });
    
    return response.json();
};

export const getNowPlaying = async (CLIENT_ID, CLEINT_SECRET, REFRESH_TOKEN) => {
    const { ACCESS_TOKEN } = await getAccessToken(
        CLIENT_ID,
        CLEINT_SECRET,
        REFRESH_TOKEN
    );
    return fetch(NOW_PLAYING_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
    });
};

export default async function getNowPlayingItem(
    CLIENT_ID,
    CLEINT_SECRET,
    REFRESH_TOKEN
) {
    const response = await getNowPlaying(CLIENT_ID, CLEINT_SECRET, REFRESH_TOKEN);
    if (response.status === 204 || response.status > 400) {
        return false;
    }
    const song = await response.json();
    const albumImageUrl = song.item.album.images[0].url;
    const artist = song.item.artists.map((_artist) => _artist.name).join(", ");
    const isPlaying = song.is_playing;
    const songUrl = song.item.external_urls.spotify;
    const title = song.item.name;
    
    return {
        albumImageUrl,
        artist,
        isPlaying,
        songUrl,
        title,
    };
}