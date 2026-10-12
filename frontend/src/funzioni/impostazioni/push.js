import { notificheApi } from '../../api/notifiche.js';

// Tutto quello che riguarda il browser per i promemoria: permesso, iscrizione push, notifica di prova.
// Il server manda il promemoria all'ora scelta; qui si crea e si tiene allineata l'iscrizione.

const CHIAVE_ORA = 'marea:promemoria-ora';
export const ORA_PREDEFINITA = '21:00';

export const pushSupportato = () =>
  typeof navigator !== 'undefined' && 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;

export function oraSalvata() {
  try {
    return localStorage.getItem(CHIAVE_ORA) || ORA_PREDEFINITA;
  } catch {
    return ORA_PREDEFINITA;
  }
}

function ricordaOra(ora) {
  try {
    localStorage.setItem(CHIAVE_ORA, ora);
  } catch {
    // non e' grave: al prossimo avvio si riparte dall'ora predefinita
  }
}

function inBytes(base64url) {
  const base64 = (base64url + '='.repeat((4 - (base64url.length % 4)) % 4)).replace(/-/g, '+').replace(/_/g, '/');
  return Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
}

async function registrazione() {
  return navigator.serviceWorker.ready;
}

export async function iscrizioneAttuale() {
  return (await registrazione()).pushManager.getSubscription();
}

function perIlServer(iscrizione, ora, attivo) {
  const { endpoint, keys } = iscrizione.toJSON();
  return {
    endpoint,
    p256dh: keys.p256dh,
    auth: keys.auth,
    ora,
    fuso: Intl.DateTimeFormat().resolvedOptions().timeZone,
    attivo,
  };
}

// Chiede il permesso, crea l'iscrizione e la registra sul server.
// Lancia un Error con un messaggio leggibile se qualcosa non va.
export async function attivaPromemoria(ora) {
  if (!pushSupportato()) throw new Error('Questo dispositivo non supporta le notifiche.');
  if ((await Notification.requestPermission()) !== 'granted') {
    throw new Error('Le notifiche sono bloccate: abilitale dalle impostazioni del browser.');
  }
  const chiave = await notificheApi.chiavePubblica();
  if (!chiave) throw new Error('Il server non ha ancora le notifiche attive.');
  const reg = await registrazione();
  const iscrizione = (await reg.pushManager.getSubscription())
    || (await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: inBytes(chiave) }));
  await notificheApi.salvaIscrizione(perIlServer(iscrizione, ora, true));
  ricordaOra(ora);
}

export async function cambiaOraPromemoria(ora) {
  const iscrizione = await iscrizioneAttuale();
  if (iscrizione) await notificheApi.salvaIscrizione(perIlServer(iscrizione, ora, true));
  ricordaOra(ora);
}

export async function disattivaPromemoria() {
  const iscrizione = await iscrizioneAttuale();
  if (!iscrizione) return;
  await notificheApi.rimuoviIscrizione(iscrizione.endpoint);
  await iscrizione.unsubscribe();
}

// Mostra subito una notifica su questo dispositivo, per controllare che arrivino
export async function notificaDiProva() {
  if (!pushSupportato() || Notification.permission !== 'granted') {
    throw new Error('Prima attiva il promemoria giornaliero.');
  }
  await (await registrazione()).showNotification('Marea', {
    body: 'Le notifiche funzionano. Ti ricorderò di compilare la diary card.',
    icon: `${import.meta.env.BASE_URL}icon-192.png`,
    tag: 'prova',
  });
}
