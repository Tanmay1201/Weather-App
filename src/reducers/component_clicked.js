let defaultState = {
    selected: {
        max_temp: null,
        icon: null,
        isSelected: false,
        dayName: null,
        humidity: null,
        pressure: null,
        clickedIndex: -1
    } 
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