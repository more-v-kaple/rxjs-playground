import { interval, BehaviorSubject, of } from 'rxjs';
import { map, scan, switchMap, tap } from 'rxjs/operators';

interface State {
    count: boolean;
    speed: number;
    value: number;
}

const defaultState = { count: false, speed: 1000, value: 0 };
const state$ = new BehaviorSubject({});

const stopWatch$ = state$.pipe(
  scan((state: State, current: {}): State => ({ ...state, ...current }), defaultState),
  switchMap((state: State) => state.count
    ? interval(state.speed)
      .pipe(
        map(() => state),
        tap(() => state.value++)
      )
    : of(state)),
);

export const stopWatchService = {
  init: () => {
    state$.next(defaultState)
  },
  subscribe: (setState: any) => stopWatch$.subscribe(setState),
  start: () => state$.next({ count: true }),
  pause: () => state$.next({ count: false }),
  stop: () => state$.next({ count: false, value: 0 }),
  changeSpeed: (speed: number) => state$.next({ speed })
}