import ReactDOM from 'react-dom';
import React from 'react';
import { Main } from './Main';

export class App
{
    constructor()
    {
        this.render();
    }

    private render(): void
    {
        ReactDOM.render(React.createElement(Main), document.getElementById("app"));
    }
}

new App();