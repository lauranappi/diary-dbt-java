// Cerca una versione nuova dell'app e ricarica la pagina (come il doppio tocco su Home di Marea).
export async function aggiornaApp() {
  try {
    const reg = await navigator.serviceWorker?.getRegistration();
    if (reg) {
      await Promise.race([reg.update(), new Promise((r) => setTimeout(r, 2500))]);
    }
  } catch {
    // senza service worker basta ricaricare
  }
  window.location.reload();
}
