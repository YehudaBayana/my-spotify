export interface Playlist {
    id: string;
    name: string;
    description: string;
    owner: { id: string };
    images: { url: string }[];
    tracks: { total: number };
    snapshot_id: string;
    type: string;
    public: boolean;
}

export interface Track {
    id: string;
    name: string;
    album: {
        name: string;
        images: { url: string }[];
        release_date: string;
    };
    duration_ms: number;
    uri: string;
    artists: any;
}

export interface TrackShortV {
    artists: ArtistShortV[];
    durationMs: number;
    id: string;
    image: string;
    name: string;
    uri: string;
    currentlyPlaying?: boolean;
}

export interface ArtistShortV {
    name: string; uri: string; url: string;
}

export interface Album {
    id:string,
    uri:string,
    type:string,
    artists: Artist[],
    images:{url:string}[],
    name:string,
    popularity:number,
    release_date:string,
    total_tracks:number,
    tracks: {
        items: TrackAlbum[]
    }
}
export interface Artist {
    external_urls: { spotify: string },
    href: string,
    id: string,
    name: string,
    type: string,
    uri: string,
}

export interface TrackAlbum {
    artists: Artist[],
    available_markets: string[],
    disc_number: number,
    duration_ms: number,
    explicit: boolean,
    external_urls: { spotify: string },
    href: string,
    id: string,
    name: string,
    preview_url: string,
    track_number: number,
    type: string,
    uri: string,
    is_local: boolean
}


export interface Category {
    href: string,
    icons: [
      {
        url: string,
        height: number,
        width: number
      }
    ],
    id: string,
    name: string
  }

export interface PlaylistUeryRes{
  tracks: Track[];
}