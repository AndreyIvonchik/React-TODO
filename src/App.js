import logo from './logo.svg';
import './App.css';
import Table from "./components/Table/Table";
import Container from "@material-ui/core/Container";
import React, {useCallback, useEffect, useState} from "react";

function App() {
    const [selectedRecordId, setSelectedRecordId] = useState();
    const [list, setList] = useState();

    const handleSelect = useCallback((data)=>setSelectedRecordId(data?.id), []);

    useEffect(()=>{
        if(list){
            localStorage.setItem('list', JSON.stringify(list));
        } else {
            const listFromLS = localStorage.getItem('list');

            if(listFromLS){
                setList(JSON.parse(listFromLS));
            }
        }
    }, [list]);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    To-do list
                </p>
            </header>
            <Container>
                <Table list={list || []} setList={setList} selectedRecordId={selectedRecordId} onSelect={handleSelect}/>
            </Container>
        </div>
    );
}

export default App;
