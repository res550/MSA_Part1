import * as React from "react";
import logo from './W0QgS4N.png';

export default class FirstComponent extends React.Component<{}> {

        public render() {
                return (
                        <div>
                            <header className="App-header">
                                <img src={logo} className="App-logo" alt="logo" />
                                <h1 className="App-title">Reshads MSA Application</h1>
                            </header>
                            <h2 className="Intro">Welcome to my Application which takes a youtube Channel name and returns some channel Information</h2>
                        </div>
                );
        }
}