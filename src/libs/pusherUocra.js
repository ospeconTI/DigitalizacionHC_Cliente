/** @format */

export const pusherUocra = (id, grupo, onOpen, onConnectionMessage, onInformationMessage, onImageMessage, onPDFMessage, onError, onClose) => {
    let ws = new WebSocket("wss://www.uocra.net//Pusher/api/Ws?Id=" + id + "&Grupo=" + grupo);
    const connectionEventArgs = (evt, message) => ({
        evt: evt,
        message: message,
    });
    ws.onopen = (evt) => {
        onOpen(this, connectionEventArgs(evt, null));
    };
    // cuando llega un mensaje a traves del web socket
    ws.onmessage = (evt) => {
        let stringMessage = evt.data.replace(/[\n\r\0]/g, "");
        let msg = JSON.parse(stringMessage);
        if (typeof msg == "object") {
            // tres tipos de mensaje
            if (msg.Estado == 0 || msg.Estado == 1) {
                // mensaje de conexion
                onConnectionMessage(this, connectionEventArgs(evt, msg));
                return;
            }

            if (msg.Tipo == "I") {
                onInformationMessage(this, connectionEventArgs(evt, msg));
            }
            if (msg.Tipo == null) {
                msg.Tipo = "I";
                msg.Data = "El programa que controla el Escaner no está activado";
                onInformationMessage(this, connectionEventArgs(evt, msg));
            }
            if (msg.Tipo == "J") {
                onImageMessage(this, connectionEventArgs(evt, msg));
            }
            if (msg.Tipo == "P") {
                onPDFMessage(this, connectionEventArgs(evt, msg));
            }
        }
    };
    // cuando hay un error web socket
    ws.onerror = (evt) => {
        onError(this, connectionEventArgs(evt, null));
    };
    // al cerrar conexion del web socket
    ws.onclose = (evt) => {
        onClose(this, connectionEventArgs(evt, null));
    };

    return ws;
};
