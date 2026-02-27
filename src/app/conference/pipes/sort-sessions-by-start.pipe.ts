import { Pipe, PipeTransform } from '@angular/core';
import { SessionRead } from '../../models/session.model';

@Pipe({
    name: 'sortSessionsByStart',
    standalone: true,
    pure: true,
})

export class SortSessionsByStartPipe implements PipeTransform {
    transform(sessions: ReadonlyArray<SessionRead> | null | undefined): SessionRead[]{
        if(!sessions || sessions.length === 0) return [];

        return [...sessions].sort((a, b) => {
            const aTime = a.startTime ?? '';
            const bTime = b.startTime ?? '';
            return aTime.localeCompare(bTime);
        });
    }
}