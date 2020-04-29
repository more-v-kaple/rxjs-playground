import React, { FC, memo, useMemo } from 'react';

import 'antd/lib/icon/style/index.css';
import './TimeDisplay.scss';

import {
    formatMinSecToTime,
    convertSecondsToMinutesSeconds
} from '../../utils';

import { TimeDisplayProps } from './TimeDisplay.types';

const TimeDisplay: FC<TimeDisplayProps> = ({
    seconds,
}) => {
    const time = useMemo(
        () => formatMinSecToTime(convertSecondsToMinutesSeconds(seconds)),
    [seconds]);

    return (
        <div className="time-display timer-block">
            <div className="time-display__main">
                <span className="time">{time}</span>
            </div>
        </div>
    )
}

export default memo(TimeDisplay);
