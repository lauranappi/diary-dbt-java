import { chiamata, ErroreApi } from './cliente.js';

// Il server ha una versione piu' recente: contiene il documento attuale da cui ripartire
export class ConflittoVersione extends Error {
  constructor(attuale) {
    super('Il documento è stato modificato altrove');
    this.attuale = attuale;
  }
}

export const documentiApi = {
  async leggi(chiave) {
    try {
      return await chiamata(`/api/documenti/${chiave}`);
    } catch (e) {
      if (e instanceof ErroreApi && e.stato === 404) return null;
      throw e;
    }
  },

  async salva(chiave, contenuto, versioneBase) {
    try {
      return await chiamata(`/api/documenti/${chiave}`, {
        metodo: 'PUT',
        corpo: { contenuto, versioneBase },
      });
    } catch (e) {
      if (e instanceof ErroreApi && e.stato === 409) throw new ConflittoVersione(e.corpo.attuale);
      throw e;
    }
  },

  elimina: (chiave) => chiamata(`/api/documenti/${chiave}`, { metodo: 'DELETE' }),
};
