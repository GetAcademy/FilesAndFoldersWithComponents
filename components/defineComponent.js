export function defineComponent(tagName, renderFn, props = []) {
  class AutoComponent extends HTMLElement {
    static get observedAttributes() {
      return props.map(p => typeof p === 'string' ? p : p.name);
    }

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this._props = {};
      this.state = {};
      this._renderQueued = false;

      props.forEach(p => {
        const name = typeof p === 'string' ? p : p.name;
        Object.defineProperty(this, name, {
          get: () => this._props[name],
          set: value => {
            const castedValue = castProp(p, value);
            if (this._props[name] !== castedValue) {
              this._props[name] = castedValue;
              this.setAttribute(name, castedValue);
              this._queueRender();
            }
          }
        });
      });
    }

    connectedCallback() {
      props.forEach(p => {
        const name = typeof p === 'string' ? p : p.name;
        const attr = this.getAttribute(name);
        if (attr !== null) {
          this._props[name] = castProp(p, attr);
        }
      });
      this._queueRender();
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue !== newValue) {
        const p = props.find(p => (typeof p === 'string' ? p : p.name) === name);
        this._props[name] = castProp(p, newValue);
        this._queueRender();
      }
    }

    _queueRender() {
      if (!this._renderQueued) {
        this._renderQueued = true;
        queueMicrotask(() => {
          this._renderQueued = false;
          this._render();
        });
      }
    }

    _render() {
      renderFn(this.shadowRoot, this._props, this.state, this.emit.bind(this));
    }

    emit(eventName, detail = {}) {
      this.dispatchEvent(new CustomEvent(eventName, {
        detail,
        bubbles: true,
        composed: true
      }));
    }
  }

  customElements.define(tagName, AutoComponent);
}

function castProp(p, value) {
  if (!p || typeof p === 'string') return value;
  switch (p.type) {
    case Boolean: return value === '' || value === 'true';
    case Number: return Number(value);
    default: return value;
  }
}
