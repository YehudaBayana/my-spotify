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