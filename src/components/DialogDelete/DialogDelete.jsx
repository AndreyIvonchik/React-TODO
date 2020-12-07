import React, {useCallback} from 'react';
import {connect, useDispatch, useSelector} from "react-redux";
import {deleteTodo} from "../../actions";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Transition from "../Transition";

const DialogDelete = ({open, onClose}) => {

    const selectedRecordId = useSelector(state => state.tables.selectedRecordId);
    const dispatch = useDispatch();

    const handleDelete = useCallback(() => {
        dispatch(deleteTodo(selectedRecordId));
        onClose();
    }, [dispatch, onClose, selectedRecordId]);

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={onClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">Подтверждение</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Вы действительно хотите удалить элемент?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Отмена
                </Button>
                <Button onClick={handleDelete} color="primary">
                    Удалить
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default connect()(DialogDelete)
