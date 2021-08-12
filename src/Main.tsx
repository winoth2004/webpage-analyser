import React from 'react';

import { Form } from './Form';

import './style.css';
import Icon from './icon.png';

export class Main extends React.Component<{}>
{
    public render(): JSX.Element
    {
        return (
            <div className="app-container">
                <div className="nav-container">
                    <img className="icon" src={Icon} />
                    <h1 className="hello">Website analytics report</h1>
                </div>
                <Form />
            </div>
            );
    }
}
