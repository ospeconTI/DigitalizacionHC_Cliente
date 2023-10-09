/** @format */

import { pusherUocraScaner, scan } from "../../libs/pusherScan";
import { showSpinner, hideSpinner, showError } from "../ui/actions";
import { SCAN, SCAN_ERROR, SCAN_SUCCESS, SCAN_MESSAGE } from "./actions";

let pusher = pusherUocraScaner();

export const scanning =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === SCAN) {
            scan(pusher);
            dispatch(showSpinner());
        }
    };
export const processScan =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === SCAN_SUCCESS) {
            dispatch(hideSpinner());
        }
    };
export const processError =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === SCAN_ERROR) {
            dispatch(hideSpinner());
            dispatch(showError(action.message));
        }
    };

export const processMessage =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === SCAN_MESSAGE) {
            dispatch(showError(action.message));
        }
    };

export const middleware = [scanning, processScan, processError, processMessage];
