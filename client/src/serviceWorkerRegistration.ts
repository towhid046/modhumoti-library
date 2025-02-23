// src/serviceWorkerRegistration.js

export function register() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker
                .register('/service-worker.js')
                .then((registration) => {
                    console.log('Service Worker registered with scope:', registration.scope);

                    // Check for updates to the service worker
                    registration.onupdatefound = () => {
                        const installingWorker = registration.installing;
                        if (installingWorker) {
                            installingWorker.onstatechange = () => {
                                if (installingWorker.state === 'installed') {
                                    if (navigator.serviceWorker.controller) {
                                        console.log('New content available; please refresh.');
                                    } else {
                                        console.log('Content cached for offline use.');
                                    }
                                }
                            };
                        }
                    };
                })
                .catch((error) => {
                    console.error('Service Worker registration failed:', error);
                });
        });
    }
}

export function unregister() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready
            .then((registration) => {
                registration.unregister();
            })
            .catch((error) => {
                console.error('Error unregistering Service Worker:', error);
            });
    }
}
