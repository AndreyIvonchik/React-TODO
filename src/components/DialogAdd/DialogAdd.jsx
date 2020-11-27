import React, {useCallback, useState} from 'react';
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

const DialogAdd = ({open, onClose, onAdd, list}) => {
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [errorName, setErrorName] = useState(false);
    const [errorDescription, setErrorDescription] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [errorShow, setErrorShow] = useState(false);

    const handleAdd = useCallback(() => {

        setErrorName(!taskName);
        setErrorDescription(!taskDescription);

        if (!taskDescription && !taskName) {
            setErrorText('Заполните обязательные поля!');
            setErrorShow(true);

            return false;
        }
        if (list.find(i => i.taskName === taskName)) {
            setErrorText('Задание с таким названием уже существует');
            setErrorShow(true);

            return false;
        }
        onAdd(taskName, taskDescription);
        setTaskName('');
        setTaskDescription('');
        setErrorShow(false);

        return true;
    }, [taskName, taskDescription, list, onAdd]);

    const handleTaskNameChange = useCallback((e) => {

        setErrorName(!e.target.value);
        setTaskName(e.target.value);
    }, []);

    const handleTaskDescriptionChange = useCallback((e) => {

        setErrorDescription(!e.target.value);
        setTaskDescription(e.target.value);
    }, []);
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={onClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">{"Добавление"}</DialogTitle>
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
                    autoFocus
                    required={true}
                    error={errorDescription}
                    margin="dense"
                    id="description"
                    label="Описание"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Отмена
                </Button>
                <Button onClick={handleAdd} color="primary">
                    Добавить
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogAdd;
