let defaultState = {
    selected: false 
}
const component_clicked = (state = defaultState, action) => {
    if (action.type === "SELECTED") {
        return {
            ...state,
            selected: action.payload
        }
    }
    else {
        return {
            ...state
        }
    }
};
    
export default component_clicked;