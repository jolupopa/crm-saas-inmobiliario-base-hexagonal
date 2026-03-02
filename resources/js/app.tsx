import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        let path = `./Pages/${name}.tsx`;
        if (name.includes('::')) {
            const [module, page] = name.split('::');
            path = `./Modules/${module}/Pages/${page}.tsx`;
        }

        return resolvePageComponent(path, import.meta.glob([
            './Pages/**/*.tsx',
            './Modules/**/Pages/**/*.tsx',
            './Modules/**/Presentation/Pages/**/*.tsx'
        ]));
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#FACC15',
    },

});