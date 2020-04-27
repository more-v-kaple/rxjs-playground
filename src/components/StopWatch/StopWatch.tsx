import React, { FC, useEffect, useState, useRef } from 'react';

import SpeedControls from '../SpeedControls';
import TimeDisplay from '../TimeDisplay';
import StopWatchControls from '../StopWatchControls';

import { stopWatchService } from '../../services';
import { convertSecondsToMinutesSeconds } from '../../utils';

import './StopWatch.scss';

const defaultState = {
    minutes: 0,
    seconds: 0,
    speed: 1000,
    count: false
}

const StopWatch: FC<{}> = () => {
    const [state, setState] = useState(defaultState);

    useEffect(() => {
        const subscription = stopWatchService.subscribe(({ value, speed, count }: {value: number, speed: number, count: boolean }) => {
            const { seconds, minutes } = convertSecondsToMinutesSeconds(value);

            setState({ seconds, minutes, speed, count });
        });
        stopWatchService.init();

        return () => {
            subscription.unsubscribe();
        }
    }, []);

    return (
        <div className="stopwatch">
            <div className="row">
                <TimeDisplay
                    minutes={state.minutes}
                    seconds={state.seconds}
                />
                <StopWatchControls
                    onPause={stopWatchService.pause}
                    onStop={stopWatchService.stop}
                    onResume={stopWatchService.start}
                    isStopWatchOn={state.count}
                />
            </div>
            <div className="row">
                <SpeedControls
                    onChange={stopWatchService.changeSpeed}
                    speed={state.speed}
                />
            </div>
        </div>
    )
}

export default StopWatch;
