import React, { FC, memo, MouseEvent } from 'react';
import classNames from 'classnames';
import { Button } from 'antd';

import 'antd/lib/input-number/style/index.css';
import './SpeedControls.scss';

import { speedList } from '../../constants';

import { SpeedControlsProps } from './SpeedControls.types';

const SpeedControls: FC<SpeedControlsProps> = ({ onChange, speed }) => {
    const onClick = (e: MouseEvent<HTMLInputElement>): void => onChange(parseFloat((e.currentTarget as HTMLInputElement).value));

    return (
        <div className="speed-controls timer-block">
            {
                speedList.map(({ label, value }) => {
                    const btnClass = classNames({
                        'active': speed === value
                      })

                    return (
                    <Button
                        className={btnClass}
                        onClick={onClick}
                        value={value}
                        key={value}
                        >
                        {label}
                    </Button>
                    );
                })
            }
        </div>
    )
}

export default memo(SpeedControls);
