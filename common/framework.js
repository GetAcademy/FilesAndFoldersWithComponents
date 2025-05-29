const assignPropsBySelector = (root, selectorPropMap) => {
    for (const [selector, props] of Object.entries(selectorPropMap)) {
        const el = root.querySelector(selector);
        if (!el) continue;

        const serializedProps = {};
        for (const [key, value] of Object.entries(props)) {
            serializedProps[key] = typeof value === 'object' ? JSON.stringify(value) : value;
        }

        for (const [key, value] of Object.entries(serializedProps)) {
            el[key] = value;
        }
    }
}

const defineComponent = (tagName, renderFn, propNames = [], autoRender = true) => {
    class Component extends HTMLElement {
        static get observedAttributes() {
            return propNames;
        }

        constructor() {
            super();
            this.attachShadow({ mode: 'open' });
            this.props = {};
            this.state = {};
            this.appState = undefined;
            this.renderFn = renderFn;
        }

        connectedCallback() {
            for (const name of propNames) {
                if (this.hasAttribute(name)) {
                    this.props[name] = this.getAttribute(name);
                }
            }
            if (autoRender) this.render();
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (oldValue !== newValue) {
                this.props[name] = newValue;
                this.render();
            }
        }

        render(newAppState) {
            if (newAppState !== undefined) {
                this.appState = newAppState;
            }
            this.renderFn(this);
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

const defineView = (tagName, renderFn, propNames = []) =>
    defineComponent(tagName, renderFn, propNames, false);

const listen = (selector, eventName, handler) => {
    const target = el.querySelector(selector);
    if (!target) return;
    target.addEventListener(eventName, e => handler(e.detail));
};

export { listen, defineComponent, defineView, assignPropsBySelector };