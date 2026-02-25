export type TrackRead = {
    id: number;
    name: string;
};

export type TrackCreate = {
    name: string;
}

export type TrackUpdate = TrackCreate & { id: number };
