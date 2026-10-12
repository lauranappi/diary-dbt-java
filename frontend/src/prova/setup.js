import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Ogni test parte da una pagina e da un archivio locale puliti
afterEach(() => {
  cleanup();
  localStorage.clear();
});
window.scrollTo = () => {};
