/** @format */

import { SCAN, SCAN_SUCCESS, SCAN_ERROR, GET_ID, SET_ID } from "./actions";

const initialState = {
    imageTimeStamp: null,
    imageType: "",
    image: "",
    id: "",
    idTimeStamp: null,
    errorMessage: "",
    item: null,
    fecha: null,
};

export const reducer = (state = initialState, action) => {
    const newState = {
        ...state,
    };

    switch (action.type) {
        case SCAN:
            newState.item = action.item;
            newState.fecha = action.fecha;
            break;
        case SCAN_SUCCESS:
            newState.imageTimeStamp = new Date().getTime();
            newState.imageType = action.payload.type;
            if (action.payload.type == "pdf") newState.image = action.payload.data;
            break;
        case SCAN_ERROR:
            newState.errorMessage = action.message;
            break;
        case GET_ID:
            newState.id = localStorage.IdScanner || "";
            newState.idTimeStamp = new Date().getTime();
            break;
        case SET_ID:
            localStorage.IdScanner = action.id;
            newState.id = action.id;
            break;
    }
    return newState;
};
