import React, {useCallback, useState} from "react";
import {connect, useDispatch, useSelector} from 'react-redux'
import DialogDelete from "../DialogDelete/DialogDelete";
import DialogAdd from "../DialogAdd/DialogAdd";
import {fetchPosts, selectRow, toggleTodo} from "../../actions";
import styles from './Table.module.css';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import {green} from '@material-ui/core/colors';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import {DataGrid} from "@material-ui/data-grid";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Alert from "@material-ui/lab/Alert";

const columns = [
    {field: 'taskName', headerName: 'Название', flex: 1},
    {field: 'description', headerName: 'Описание', flex: 3},
    {
        field: 'date',
        headerName: 'Дата',
        type: 'date',
        valueFormatter: ({value}) => new Date(value).toLocaleDateString(),
        flex: 1
    },
    {
        field: 'status',
        headerName: 'Статус',
        type: 'boolean',
        valueFormatter: ({value}) => value ? 'Выполнено' : 'Не выполнено',
        flex: 1,
    }
];

const ColorButton = withStyles(() => ({
    root: {
        color: green[500]
    },
}))(IconButton);

const Table = () => {
    const dispatch = useDispatch();
    const errorText = useSelector((state) => state.tables.errorText);
    const list = useSelector((state) => state.todos);
    const selectedRecordId = useSelector((state) => state.tables?.selectedRecordId);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const selectedRecord = list.find(({id}) => id === selectedRecordId);
    const showDoneBtn = selectedRecord && !selectedRecord?.status;

    const handleDelete = useCallback(() => setShowDeleteModal(true), []);

    const handleAdd = useCallback(() => setShowAddModal(true), []);

    const handleEdit = useCallback(() => {
        setShowAddModal(true);
        setIsEdit(true);
    }, []);

    const handleDone = useCallback(() =>
        dispatch(toggleTodo(selectedRecordId)), [dispatch, selectedRecordId]);

    const handleLoad = useCallback(() => dispatch(fetchPosts()), [dispatch]);

    const handleCloseAddModal = useCallback(() => {
        setIsEdit(false);
        setShowAddModal(false);
    }, []);

    const handleDeleteClose = useCallback(() => setShowDeleteModal(false), []);

    const handleRowSelected = useCallback(({data}) => 
        dispatch(selectRow(data?.id)), [dispatch]);

    return (
        <>
            <DialogDelete open={showDeleteModal} onClose={handleDeleteClose}/>
            <DialogAdd
                open={showAddModal}
                onClose={handleCloseAddModal}
                isEdit={isEdit}
            />
            {errorText && <Alert severity="error">{errorText}</Alert>}
            <div className={styles.container}>
                <Grid container
                      direction="row"
                      justify="flex-end">

                    <IconButton
                        aria-label="Загрузить"
                        onClick={handleLoad}
                        color="default">
                        <CloudUploadIcon/>
                    </IconButton>

                    <IconButton
                        aria-label="Добавить"
                        onClick={handleAdd}
                        color="primary">
                        <AddIcon/>
                    </IconButton>

                    {showDoneBtn && (
                        <>
                            <IconButton
                                aria-label="Редактировать"
                                onClick={handleEdit}
                                color="primary">
                                <EditIcon/>
                            </IconButton>
                            <ColorButton
                                aria-label="Выполнить"
                                onClick={handleDone}>
                                <DoneIcon/>
                            </ColorButton>
                        </>)}

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

export default connect()(Table)