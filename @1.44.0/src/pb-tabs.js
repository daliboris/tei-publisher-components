import { LitElement, html, css } from 'lit-element';
import '@polymer/paper-tabs';
import '@polymer/iron-pages';
import { pbMixin } from './pb-mixin.js';


/**
 * Combines a row of tabs with associated content.
 * 
 * @slot tab - tab area
 * @slot page - page area
 * @csspart pages - wrapper around the tab pages
 */
export class PbTabs extends pbMixin(LitElement) {
    static get properties() {
        return {
            ...super.properties,
            selected: {
                type: Number,
                reflect: true
            },
            _initial: {
                type: Number
            }
        };
    }

    constructor() {
        super();

        this._initial = this.getParameter('tab', 0);
        this.selected = this._initial;
    }

    _switchTab(ev) {
        this.selected = ev.detail.value;
        this.setParameter('tab', this.selected);
        this.pushHistory('browse', {
            tab: this.selected
        });
    }

    render() {
        return html`
            <paper-tabs id="tabs" selected="${this._initial}" @selected-changed="${this._switchTab}">
                <slot name="tab"></slot>
            </paper-tabs>
            <iron-pages part="pages" selected="${this.selected}">
                <slot name="page"></slot>
            </iron-pages>
        `;
    }

    static get styles() {
        return css`
            :host {
                display: block;
            }
        `;
    }
}
customElements.define('pb-tabs', PbTabs);