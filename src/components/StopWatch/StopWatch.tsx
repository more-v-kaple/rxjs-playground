import React, { FC, useEffect, useState, useRef } from 'react';
import { Subscription } from 'rxjs';

import SpeedControls from '../SpeedControls';
import TimeDisplay from '../TimeDisplay';
import StopWatchControls from '../StopWatchControls';

import { getStopwatch } from '../../services';

import './StopWatch.scss';

interface State {
    value: number;
    speed: number;
    count: boolean;
}

const defaultState = {
    value: 0,
    speed: 1000,
    count: false
}

const StopWatch: FC<{}> = () => {
    const [state, setState] = useState(defaultState);
    const subscription = useRef(new Subscription());

    function start(){
        subscribe();
        setState((prevState: State) => ({...prevState, count: true }));
    }

    function stop(complete = true){
        setState((prevState: State) => (
            {...prevState, count: false, value: complete? 0 : state.value }
        ));
        unsubscribe();
    }

    function subscribe() {
        subscription.current = getStopwatch(state.speed, state.value)
        .subscribe((value: number) => {
            setState((prevState: State) => ({ ...prevState, value }));
        });
    }

    function unsubscribe() {
        subscription.current.unsubscribe();
    }

    function changeSpeed(speed: number): void {
        setState((prevState: State) => ({...prevState, speed }));
    }

    useEffect(() => {
        return () => {
            if (typeof subscription.current?.unsubscribe === 'function') {
                subscription.current.unsubscribe();
            }
        }
    }, []);

    useEffect(() => {
        if (state.count) {
            unsubscribe();
            subscribe();
        }
    }, [state.speed])

    return (
        <div className="stopwatch">
            <div className="row">
                <TimeDisplay
                    seconds={state.value}
                />
                <StopWatchControls
                    onStop={stop}
                    onResume={start}
                    isStopWatchOn={state.count}
                />
            </div>
            <div className="row">
                <SpeedControls
                    onChange={changeSpeed}
                    speed={state.speed}
                />
            </div>
        </div>
    )
}

export default StopWatch;
