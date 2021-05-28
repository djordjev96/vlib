import './App.css';
import React from 'react';
import MainComponent from './components/MainComponent';
import LoginComponent from './components/LoginComponent';

function App() {

    if (!localStorage.getItem('token')) {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>vLib - virtual library</h1>
                    <LoginComponent />
                </header>
            </div>
        );
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>vLib - virtual library</h1>
            </header>
            <div className="appBody">
                <MainComponent />
            </div>
        </div>
    );
}

export default App;
