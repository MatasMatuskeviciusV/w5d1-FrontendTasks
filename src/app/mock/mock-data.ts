import type { TrackRead } from '../models/track.model';
import type { SpeakerRead } from '../models/speaker.model';
import type { SessionRead } from '../models/session.model';
import type { AttendeeRead } from '../models/attendee.model';

export const MOCK_TRACKS: TrackRead[] = [
    { id: 1, name: 'Frontend' },
    { id: 2, name: 'Backend' },
    { id: 3, name: 'DevOps' }
];

export const MOCK_SPEAKERS: SpeakerRead[] = [
    {
        id: 1,
        name: 'Vardis Pavardis',
        bio: 'First frontender',
        webSite: 'https://pvz.com/vardis',
        sessions: [{ id: 1, title: 'TypeScript by mr. Pavardis'}],
    },
    {
        id: 2,
        name: 'Trimitas Duda',
        bio: 'Musician',
        webSite: 'https://pvz.com/trimitas',
        sessions: [{ id: 2, title: 'Angular Music'}],
    },
];

export const MOCK_SESSIONS: SessionRead[] = [
    {
        id: 1,
        title: 'TypeScript by mr. Pavardis',
        abstract: 'TS for real',
        startTime: '2026-02-25T07:00:00',
        endTime: '2026-02-25T10:00:00',
        trackId: 1,
        track: { id: 1, name: 'Frontend'},
        speakers: [{ id: 1, name: 'Vardis Pavardis'}],
    },
    {
        id: 2,
        title: 'Angular Music',
        abstract: 'Beautiful notes',
        startTime: '2026-02-25T10:30:00',
        endTime: '2026-02-25T18:45:00',
        trackId: 1,
        track: { id: 1, name: 'Frontend'},
        speakers: [{ id: 2, name: 'Trimitas Duda'}],
    },
];

export const MOCK_ATTENDEES: AttendeeRead[] = [
    {
        id: 1,
        firstName: 'Matas',
        lastName: 'Kietas',
        userName: 'matasm',
        sessions: [
            {
                id: 1,
                title: "Typescript by mr. Pavardis",
                startTime: '2026-02-25T07:00:00',
                endTime: '2026-02-25T10:00:00',
            }
        ]
    }
]