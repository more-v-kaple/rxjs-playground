import React, { FC } from 'react';

import StopWatch from '../StopWatch';

import './App.scss';

const App: FC<{}> = () => (
        <div className="app">
            <StopWatch/>
        </div>
);

export default App;
