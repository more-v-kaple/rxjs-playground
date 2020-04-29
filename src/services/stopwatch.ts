import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export function getStopwatch(speed = 1000, initialState = 0): Observable<number> {
  return interval(speed)
          .pipe(
            map((value: number): number => ++value + initialState
            )
          )
}
