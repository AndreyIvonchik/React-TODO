import React, {useCallback, useEffect, useState} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux'
import {addTodo, editTodo} from '../../actions'
import Transition from "../Transition";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from "@material-ui/core/TextField";
import Alert from '@material-ui/lab/Alert';

const DialogAdd = ({open, onClose, isEdit}) => {
    const dispatch = useDispatch();
    const selectedRecordId = useSelector(state => state.tables.selectedRecordId);
    const list = useSelector(state => state.todos);
    const selectedRecord = list.find(({id}) => id === selectedRecordId);
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [errorName, setErrorName] = useState(false);
    const [errorDescription, setErrorDescription] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [errorShow, setErrorShow] = useState(false);

    const onCloseModal = useCallback(() => {
        setErrorName(false);
        setErrorDescription(false);
        setTaskName('');
        setTaskDescription('');
        setErrorShow(false);
        onClose();
    }, [onClose]);

    const handleAdd = useCallback(() => {
        setErrorName(!taskName);
        setErrorDescription(!taskDescription);

        if (!taskDescription.trim() || !taskName.trim()) {
            setErrorText('Заполните обязательные поля!');
            setErrorShow(true);

            return false;
        }
        if (isEdit) {
            if (list.find(i => i.taskName === taskName && i.id !== selectedRecordId)) {
                setErrorText('Задание с таким названием уже существует');
                setErrorShow(true);

                return false;
            }
            dispatch(editTodo(selectedRecordId, taskName, taskDescription));
        } else {
            if (list.find(i => i.taskName === taskName)) {
                setErrorText('Задание с таким названием уже существует');
                setErrorShow(true);

                return false;
            }
            dispatch(addTodo(+new Date(), taskName, taskDescription, new Date()));
        }
        onCloseModal();

        return true;
    }, [taskName, taskDescription, isEdit, onCloseModal, list, dispatch, selectedRecordId]);

    const handleTaskNameChange = useCallback((e) => {
        setErrorName(!e.target.value);
        setTaskName(e.target.value);
    }, []);

    const handleTaskDescriptionChange = useCallback((e) => {
        setErrorDescription(!e.target.value);
        setTaskDescription(e.target.value);
    }, []);

    useEffect(() => {
        if (isEdit) {
            setTaskName(selectedRecord.taskName);
            setTaskDescription(selectedRecord.description);
        }
    }, [isEdit, selectedRecord]);

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={onClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">{isEdit ? "Редактирование" : "Добавление"}</DialogTitle>
            <DialogContent>
                {errorShow && <Alert severity="error">{errorText}</Alert>}
                <TextField
                    value={taskName}
                    onChange={handleTaskNameChange}
                    autoFocus={true}
                    required={true}
                    error={errorName}
                    margin="dense"
                    id="name"
                    label="Название"
                    fullWidth
                />
                <TextField
                    value={taskDescription}
                    onChange={handleTaskDescriptionChange}
                    required={true}
                    error={errorDescription}
                    margin="dense"
                    id="description"
                    label="Описание"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onCloseModal} color="primary">
                    Отмена
                </Button>
                <Button onClick={handleAdd} color="primary">
                    {isEdit ? 'Редактировать' : 'Добавить'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default connect()(DialogAdd);
