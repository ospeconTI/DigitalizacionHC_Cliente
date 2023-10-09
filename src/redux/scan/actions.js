/** @format */

export const SCAN = "[SCAN] scan";
export const SCAN_SUCCESS = "[SCAN] success";
export const SCAN_ERROR = "[SCAN] error";
export const SCAN_MESSAGE = "[SCAN] message";
export const GET_ID = "[SCAN] get Id";
export const SET_ID = "[SCAN] set Id";

export const scan = (item, fecha, idEscaner) => ({
    type: SCAN,
    idEscaner: idEscaner,
    fecha: fecha,
    item: item,
});

export const getID = () => ({
    type: GET_ID,
});
export const setID = (id) => ({
    type: SET_ID,
    id: id,
});
