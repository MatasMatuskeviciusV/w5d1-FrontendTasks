export type AttendeeRead = {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    sessions?: Array<{
        id: number;
        title: string;
        startTime: string;
        endTime: string;
    }>;
};

export type AttendeeCreate = {
    firstName: string;
    lastName: string;
    userName: string;
    emailAddress: string;
};

export type AttendeeUpdate = AttendeeCreate & { id: number };