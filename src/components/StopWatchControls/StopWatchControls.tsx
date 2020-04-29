import React, { FC, memo } from 'react';
import { PlayCircleOutlined, PauseCircleOutlined, StopOutlined } from '@ant-design/icons';

import { StopWatchControlsProps } from './StopWatchControls.types';

import './StopWatchControls.scss';

const StopWatchControls: FC<StopWatchControlsProps> = memo(({ isStopWatchOn, onResume, onStop }) => {
    const onPause = onStop.bind(null, false);

    return (
        <div className="stopwatch-controls">
            {
                isStopWatchOn ? <PauseCircleOutlined onClick={onPause}/>
                : <PlayCircleOutlined onClick={onResume}/>
            }
            <StopOutlined onClick={onStop}/>
        </div>
    )
});

export default StopWatchControls;