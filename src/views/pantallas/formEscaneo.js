/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers/connect";
import { SCAN, VER } from "../../../assets/icons/svgs";
import { input } from "@brunomon/template-lit/src/views/css/input";
import { button } from "@brunomon/template-lit/src/views/css/button";
import { select } from "@brunomon/template-lit/src/views/css/select";
import { gridLayout } from "@brunomon/template-lit/src/views/css/gridLayout";
import { getID } from "../../redux/scan/actions";
import { scan } from "../../redux/scan/actions";
import { showAlert } from "../../redux/ui/actions";

const SCAN_OK = "scan.imageTimeStamp";
const SCAN_ERROR = "scan.errorMessage";

export class formScaneo extends connect(store, SCAN_ERROR, SCAN_OK)(LitElement) {
    constructor() {
        super();
        this.documento1 = "";
        this.documento2 = "x";
        this.verificado = false;
        this.data = [
            {
                orden: 10,
                sectorCarga: "Central",
                fechaCarga: "2023-10-05",
                descripcion: "Autorización 1",
            },
            {
                orden: 20,
                sectorCarga: "Franchín",
                fechaCarga: "2023-10-04",
                descripcion: "Autorización 2",
            },
            {
                orden: 30,
                sectorCarga: "Bariloche",
                fechaCarga: "2023-10-06",
                descripcion: "Autorización 3",
            },
            {
                orden: 40,
                sectorCarga: "Mar del Plata",
                fechaCarga: "2023-09-05",
                descripcion: "Autorización 4",
            },
        ];
    }

    static get styles() {
        return css`
            ${gridLayout}
            ${input}
            ${button}
            ${select}
            :host {
                padding: 1rem;
                display: grid;
                gap: 1rem;
                align-content: start;
            }

            host[hidden] {
                display: none;
            }

            .container {
                display: grid;
                grid-template-columns: 1fr 2fr;
                gap: 1rem;
            }

            .template {
                grid-template-columns: 7% 18% 17% 20% 19% 19%;
            }
            .cell {
                display: grid;
                padding: 0.5rem;
                background: var(--formulario);
                color: var(--on-formulario);
                align-content: center;
            }
            .title {
                font-weight: bold;
                cursor: pointer;
            }
            .items {
                gap: 0.2rem;
                overflow-x: auto;
                max-height: 65vh;
            }

            .items::-webkit-scrollbar {
                width: 6px;
                background: var(--aplicacion);
            }
            .items::-webkit-scrollbar-thumb {
                border-radius: 5px;
                background: var(--primario);
            }
            .form-scan {
                display: grid;
                margin: auto;
                background: var(--formulario);
                padding: 1rem;
                border-radius: 5%;
                width: 95%;
                height: 97%;
            }

            h2 {
                text-align: center;
                color: var(--on-formulario);
                background: var(--formulario);
                padding: 1rem;
                margin: 0.2rem 0;
            }
            label {
                display: block;
                color: var(--on-formulario);
                margin-top: 0.8rem;
            }
            button {
                margin: auto;
            }
            #scan:active {
                transform: scale(0.9);
            }
            .cabecera {
                margin-bottom: 0.2rem;
            }

            #scaner-item {
                border: none;
            }
        `;
    }
    render() {
        return html`
            <div class="container">
                <div class="form-scan">
                    <h2>Formulario:</h2>
                    <div class="input">
                        <input id="1" @input="${this.handleFirstInput}" />
                        <label for="1">Ingrese el DNI del Afiliado</label>
                    </div>
                    <div class="input">
                        <input id="2" @input="${this.handleSecondInput}" />
                        <label for="2">Confirme volviendo a ingresar el DNI del Afiliado</label>
                    </div>
                    <div class="input">
                        <input id="observaciones" />
                        <label for="observaciones">Observaciones</label>
                    </div>
                    <div class="select">
                        <select id="pais" required>
                            <option value="" disabled selected>Selecciona una opción</option>
                            <option value="1">Casa Central</option>
                            <option value="2">La Plata</option>
                            <option value="3">Rosario</option>
                            <option value="4">Córdoba</option>
                        </select>
                        <label for="pais">CEMAP</label>
                    </div>
                    <button id="btnScannear" raised ?disabled="${!this.verificado}" @click="${this.scanear}" circle action big>
                        <div>${SCAN}</div>
                        <div class="justify-self-center">Scan</div>
                    </button>
                </div>
                <div class="grilla">
                    <h2>Documentos Cargados:</h2>
                    <div class="layout column template cabecera">
                        <div class="cell title">Orden</div>
                        <div class="cell title">CEMAP</div>
                        <div class="cell title">Fecha de Carga</div>
                        <div class="cell title">Usuario</div>
                        <div class="cell title">Observaciones</div>
                        <div class="cell title end">Visualizar</div>
                    </div>
                    <div class="layout items">
                        ${this.data.map(
                            (item) => html`
                                <div class="layout column template">
                                    <div class="input cell input-number">
                                        <input value=${item.orden} type="number" />
                                    </div>
                                    <div class="cell">${item.sectorCarga}</div>
                                    <div class="cell">${item.fechaCarga}</div>
                                    <div class="cell">${item.descripcion}</div>
                                    <div class="cell">${item.descripcion}</div>
                                    <div class="cell end">
                                        <button id="scaner-item">
                                            <div>${VER}</div>
                                        </button>
                                    </div>
                                </div>
                            `
                        )}
                    </div>
                </div>
            </div>
        `;
    }
    scanear(e) {
        /*   store.dispatch(showAlert("Scanner", "Scaneando documento, aguarde")); */
        this.pdf = "";
        store.dispatch(scan());
    }

    stateChanged(state, name) {
        /*  if (name == OCULTAR_SCANNER) {
            this.hidden = state.ui.scanner.oculto;
            this.update();
        } */
        if (name == SCAN_OK) {
            this.pdf = "data:application/pdf;base64," + state.scan.image;
            this.itemImagen = {
                nameSave: state.scan.imageTimeStamp + ".pdf",
                nameFile: state.scan.imageTimeStamp + ".pdf",
                imagen: state.scan.image,
                tipo: "application/pdf",
            };
            this._comprobante.value = state.scan.imageTimeStamp + ".pdf";
        }
        if (name == SCAN_ERROR) {
            store.dispatch(showAlert("Error!", state.scan.errorMessage));
        }
    }

    configurar(e) {
        store.dispatch(getID());
    }
    handleFirstInput(event) {
        this.documento1 = event.target.value;
        this.verificado = this.documento == event.target.value;
    }
    handleSecondInput(event) {
        this.documento2 = event.target.value;
        this.verificado = this.documento1 == this.documento2;
    }
    static get properties() {
        return {
            hidden: {
                type: Boolean,
                reflect: true,
            },

            documento: {
                type: String,
            },
            validacionDocumento: {
                type: String,
            },
            mostrarInput: {
                type: Boolean,
            },
            verificado: {
                type: Boolean,
                reflect: true,
            },
        };
    }
}
window.customElements.define("form-scaneo", formScaneo);
