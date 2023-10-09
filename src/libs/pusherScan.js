/** @format */

import { pusherUocra } from "./pusherUocra";
import { store } from "../redux/store";
import { SCAN_SUCCESS, SCAN_MESSAGE, SCAN_ERROR } from "../redux/scan/actions";

export const scanGuardarId = (pId) => {
    localStorage.IdEscaner = pId;
};

export const scanLeerId = () => {
    return localStorage.IdEscaner;
};

export const pusherUocraScaner = () => {
    if (!localStorage.IdPagina) {
        localStorage.IdPagina = String.fromCharCode(Math.floor(Math.random() * 25 + 65)) + new Date().getTime();
    }
    const id = localStorage.IdPagina;
    const grupo = "Web";
    return pusherUocra(id, grupo, onOpen, onConnectionMessage, onInformationMessage, onImageMessage, onPDFMessage, onError, onClose);
};

export const scan = (pusher) => {
    pusher.send(
        JSON.stringify({
            IdEmisor: localStorage.IdPagina,
            IdReceptor: localStorage.IdScanner,
            Tipo: "A",
            Data: "ESCANEAR",
        })
    );
};

const onOpen = (sender, e) => {
    //console.log(e.message)
};
const onInformationMessage = (sender, e) => {
    if (e.message.Data == "ESCANEANDO") {
        store.dispatch({
            type: SCAN_MESSAGE,
            message: e.message.Data,
        });
    } else {
        store.dispatch({
            type: SCAN_ERROR,
            message: e.message.Data,
        });
    }

    //console.log(e.message)
};
const onImageMessage = (sender, e) => {
    store.dispatch({
        type: SCAN_SUCCESS,
        payload: {
            type: "image",
            data: e.message.Data,
        },
    });
    //console.log(e.message)
};
const onPDFMessage = (sender, e) => {
    store.dispatch({
        type: SCAN_SUCCESS,
        payload: {
            type: "pdf",
            data: e.message.Data,
        },
    });
    //console.log(e.message)
};
const onConnectionMessage = (sender, e) => {
    //console.log(e.message)
};
const onError = (sender, e) => {
    store.dispatch({
        type: SCAN_ERROR,
        message: e.Data,
    });
    //console.log(e.message)
};
const onClose = (sender, e) => {
    //console.log(e.message)
};
