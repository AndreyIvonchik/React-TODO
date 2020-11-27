import {DataGrid} from "@material-ui/data-grid";
import React, {useCallback, useEffect, useState} from "react";
import styles from './Table.module.css';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import AddIcon from '@material-ui/icons/Add';
import {green} from '@material-ui/core/colors';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import DialogDelete from "../DialogDelete/DialogDelete";
import DialogAdd from "../DialogAdd/DialogAdd";

const columns = [
    {field: 'taskName', headerName: 'Название', flex: 1},
    {field: 'description', headerName: 'Описание', flex: 3},
    {
        field: 'date',
        headerName: 'Дата',
        type: 'date',
        flex: 1
    },
    {
        field: 'status',
        headerName: 'Статус',
        type: 'number',
        valueFormatter: ({value}) => value ? 'Выполнено' : 'Не выполнено',
        flex: 1,
    }
];

const ColorButton = withStyles((theme) => ({
    root: {
        color: green[500]
    },
}))(IconButton);

const Table = ({list, setList, selectedRecordId, onSelect}) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const selectedRecord = list.find(({id}) => id === selectedRecordId);
    const showDoneBtn = selectedRecord && !selectedRecord?.status;

    const handleDelete = useCallback(() => setShowDeleteModal(true), []);

    const handleCloseDeleteModal = useCallback(() => setShowDeleteModal(false), []);

    const handleAdd = useCallback(() => setShowAddModal(true), []);

    const handleCloseAddModal = useCallback(() => setShowAddModal(false), []);

    const handleDeleteModal = useCallback(() => {
        setList(list.filter(item => item.id !== selectedRecordId));
        onSelect();
        setShowDeleteModal(false);
    }, [setList, list, onSelect, selectedRecordId]);

    const handleAddModal = useCallback((name, description) => {
        setList([{
            id: +new Date(),
            taskName: name,
            description: description,
            date: new Date().toLocaleDateString(),
            status: 0
        }, ...list]);
        setShowAddModal(false);
    }, [list, setList]);

    const handleDone = useCallback(() => {
        const newList = list.map((i) => {
            if (i.id === selectedRecordId) {
                return {
                    ...i,
                    status: 1
                };
            }
            return i;
        });

        setList([...newList]);
    }, [list, setList, selectedRecordId]);

    const handleRowSelected = useCallback(({data}) => {
        onSelect(data);
    }, [onSelect]);

    return (
        <>
            <DialogDelete open={showDeleteModal} onClose={handleCloseDeleteModal} onDelete={handleDeleteModal}/>
            <DialogAdd
                open={showAddModal}
                onClose={handleCloseAddModal}
                onAdd={handleAddModal}
                list={list}
            />
            <div className={styles.container}>
                <Grid container
                      direction="row"
                      justify="flex-end">

                    <IconButton
                        aria-label="Добавить"
                        onClick={handleAdd}
                        color="primary">
                        <AddIcon/>
                    </IconButton>

                    {showDoneBtn && (
                        <ColorButton
                            aria-label="Выполнить"
                            onClick={handleDone}>
                            <DoneIcon/>
                        </ColorButton>)}

                    {selectedRecord && (
                        <IconButton
                            onClick={handleDelete}
                            aria-label="Удалить"
                            color="secondary">
                            <DeleteIcon/>
                        </IconButton>)}
                </Grid>
                <DataGrid
                    rows={list}
                    columns={columns}
                    pageSize={5}
                    onRowSelected={handleRowSelected}
                />
            </div>
        </>
    );
}

export default Table;