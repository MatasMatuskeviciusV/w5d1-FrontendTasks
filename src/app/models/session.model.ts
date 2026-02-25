import type {TrackRead} from './track.model';
import type {SpeakerRead} from './speaker.model';

export type SessionRead = {
    id: number;
    title: string;
    abstract: string;
    startTime: string;
    endTime: string;
    trackId: number;

    track?: TrackRead;
    speakers?: SpeakerRead[];
};

export type SessionCreate = {
    title: string;
    abstract: string;
    startTime: string;
    endTime: string;
    trackId: number;
};

export type SessionUpdate = SessionCreate & { id: number };
