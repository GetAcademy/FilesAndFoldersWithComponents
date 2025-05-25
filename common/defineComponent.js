export function defineComponent(tagName, renderFn, propNames = []) {
  class Component extends HTMLElement {
    static get observedAttributes() {
      return propNames;
    }

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.props = {};
      this.state = {};
    }

    connectedCallback() {
      for (const name of propNames) {
        if (this.hasAttribute(name)) {
          this.props[name] = this.getAttribute(name);
        }
      }
      this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue !== newValue) {
        this.props[name] = newValue;
        this.render();
      }
    }

    render() {
      renderFn(this);
    }

    emit(name, detail = {}) {
      this.dispatchEvent(new CustomEvent(name, {
        detail,
        bubbles: true,
        composed: true
      }));
    }
  }

  for (const name of propNames) {
    Object.defineProperty(Component.prototype, name, {
      get() {
        return this.props[name];
      },
      set(value) {
        this.props[name] = value;
        this.setAttribute(name, value);
        this.render();
      }
    });
  }

  customElements.define(tagName, Component);
}