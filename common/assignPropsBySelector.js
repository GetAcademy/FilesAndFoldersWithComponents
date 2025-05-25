export function assignPropsBySelector(root, selectorPropMap) {
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