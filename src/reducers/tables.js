const initialState = {
    selectedRecordId: null
};

const tables = (state = initialState, action) => {
    switch (action.type) {
        case 'SELECT_ROW':
            return {
                selectedRecordId: action.id
            }
        default:
            return state
    }
}

export default tables
