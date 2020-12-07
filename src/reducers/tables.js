const initialState = {
    selectedRecordId: null,
    errorText: null
};

const tables = (state = initialState, action) => {
    switch (action.type) {
        case 'SELECT_ROW':
            return {
                ...state,
                selectedRecordId: action.id
            }
        case 'SHOW_ALERT':
            return {
                ...state,
                errorText: action.errorText
            }
        case 'HIDE_ALERT':
            return {
                ...state,
                errorText: null
            }
        default:
            return state
    }
}

export default tables
