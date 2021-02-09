const component_clicked_action = data => {
    return function (dispatch) {
         dispatch({  type: "SELECTED", payload: data });
    }
}

export {component_clicked_action};