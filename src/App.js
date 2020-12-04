import React from "react";
import logo from './logo.svg';
import './App.css';
import Table from "./components/Table/Table";
import Container from "@material-ui/core/Container";

const App = () => {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>To-do list</p>
            </header>
            <Container>
                <Table/>
            </Container>
        </div>
    );
}

export default App;
