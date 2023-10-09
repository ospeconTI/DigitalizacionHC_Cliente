/** @format */

/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers/connect";
import { button } from "@brunomon/template-lit/src/views/css/button";
import { setID } from "../../redux/scan/actions";

const SCANNER_ID = "scan.idTimeStamp";
export class scannerID extends connect(store, SCANNER_ID)(LitElement) {
    constructor() {
        super();
    }

    static get styles() {
        return css`
            ${button}
            :host {
                display: grid;
                position: absolute;
                padding: 2rem;
                grid-gap: 2rem;
                grid-template-columns: auto;
                grid-template-rows: 1fr 1fr 1fr;
                z-index: 1000;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(60deg, var(--on-formulario), var(--on-aplicacion));
                color: var(--formulario);
                border-radius: 0.4rem;
            }
            :host([hidden]) {
                display: none;
            }
            .titulo {
                display: grid;
                align-items: center;
                justify-items: center;
            }
            .botonera {
                display: grid;
                grid-template-columns: 1fr 1fr;
                grid-gap: 0.5rem;
            }
            input {
                font-size: 1.2rem;
            }
        `;
    }
    render() {
        return html`
            <div class="titulo">SCANNER</div>
            <input type="text" placeholder="Ingrese el ID del Scanner" id="id" />
            <div class="botonera">
                <button raised etiqueta @click="${this.aceptar}">
                    <div class="justify-self-start">ACEPTAR</div>
                </button>
                <button raised etiqueta @click="${this.cerrar}">
                    <div class="justify-self-start">CANCELAR</div>
                </button>
            </div>
        `;
    }

    cerrar(e) {
        this.hidden = true;
        this.update();
    }
    aceptar(e) {
        store.dispatch(setID(this.shadowRoot.querySelector("#id").value));
        this.hidden = true;
        this.update();
    }

    stateChanged(state, name) {
        if (name == SCANNER_ID) {
            this.shadowRoot.querySelector("#id").value = state.scan.id;
            this.shadowRoot.querySelector("#id").focus();
            this.hidden = false;
            this.update();
        }
    }

    static get properties() {
        return {
            hidden: {
                type: Boolean,
                reflect: true,
            },
        };
    }
}
window.customElements.define("scanner-id", scannerID);
