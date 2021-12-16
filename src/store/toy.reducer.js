const initialState = {
    toys: null
}

export function toyReducer(state = initialState, action) {
    let toys;
    switch (action.type) {
        case 'SET_TOYS':
            return { ...state, toys: action.toys }
        case 'REMOVE_TOY':
            toys = state.toys.filter(toy => toy._id !== action.toyId)
            return { ...state, toys }
        case 'ADD_TOY':
            toys = [action.toy, ...state.toys]
            return { ...state, toys }
        case 'UPDATE_TOY':
            toys = state.toys.map(toy => (toy._id === action.toy._id) ? action.toy : toy)
            return { ...state, toys }
        default:
            return { ...state }
    }
}