// Aggiunto al service worker dell'app: mostra il promemoria quando il server lo manda
self.addEventListener('push', (evento) => {
  let dati = {};
  try {
    dati = evento.data ? evento.data.json() : {};
  } catch {
    // messaggio senza JSON: si usa il testo di default
  }
  evento.waitUntil(self.registration.showNotification(dati.title || 'Marea', {
    body: dati.body || 'Non dimenticare di compilare la tua diary card di oggi!',
    icon: './icon-192.png',
    badge: './icon-192.png',
    tag: 'promemoria-giornaliero',
  }));
});

self.addEventListener('notificationclick', (evento) => {
  evento.notification.close();
  evento.waitUntil(self.clients.matchAll({ type: 'window' }).then((finestre) => {
    if (finestre.length) return finestre[0].focus();
    return self.clients.openWindow('./');
  }));
});
