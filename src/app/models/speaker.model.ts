export type SpeakerRead = {
    id: number;
    name: string;
    bio?: string;
    webSite?: string;

    sessions?: Array<{ id: number; title: string}>;
};

export type SpeakerCreate = {
    name: string;
    bio?: string;
    webSite?: string;
}

export type SpeakerUpdate = SpeakerCreate & { id: number };
