import React, {useCallback, useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from "@material-ui/core/TextField";
import Alert from '@material-ui/lab/Alert';
import Collapse from "@material-ui/core/Collapse";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DialogAdd = ({open, onClose, onAdd, list, isEdit, onEdit, selectedRecordId}) => {
    const selectedRecord = list.find(({id}) => id === selectedRecordId);
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [errorName, setErrorName] = useState(false);
    const [errorDescription, setErrorDescription] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [errorShow, setErrorShow] = useState(false);

    const handleAdd = useCallback(() => {

        setErrorName(!taskName);
        setErrorDescription(!taskDescription);

        if (!taskDescription || !taskName) {
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
            onEdit(taskName, taskDescription);
        } else {
            if (list.find(i => i.taskName === taskName)) {
                setErrorText('Задание с таким названием уже существует');
                setErrorShow(true);

                return false;
            }
            onAdd(taskName, taskDescription);
        }
        setErrorName(false);
        setErrorDescription(false);
        setTaskName('');
        setTaskDescription('');
        setErrorShow(false);

        return true;
    }, [taskName, taskDescription, isEdit, list, onEdit, selectedRecordId, onAdd]);

    const handleTaskNameChange = useCallback((e) => {

        setErrorName(!e.target.value);
        setTaskName(e.target.value);
    }, []);

    const onCloseModel = useCallback(() => {

        setErrorName(false);
        setErrorDescription(false);
        setTaskName('');
        setTaskDescription('');
        setErrorShow(false);
        onClose();
    }, [onClose]);

    const handleTaskDescriptionChange = useCallback((e) => {

        debugger
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
                <Collapse in={errorShow}><Alert severity="error">{errorText}</Alert></Collapse>
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
                <Button onClick={onCloseModel} color="primary">
                    Отмена
                </Button>
                <Button onClick={handleAdd} color="primary">
                    {isEdit ? 'Редактировать' : 'Добавить'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogAdd;
