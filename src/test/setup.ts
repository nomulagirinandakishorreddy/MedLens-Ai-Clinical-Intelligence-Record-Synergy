import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock window methods that jsdom does not implement
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock URL.createObjectURL and revokeObjectURL
if (typeof window.URL.createObjectURL === 'undefined') {
  window.URL.createObjectURL = vi.fn().mockReturnValue('blob:mock-url');
  window.URL.revokeObjectURL = vi.fn();
}

// In-memory LocalStorage mock
const storageMap = new Map<string, string>();
const localStorageMock = {
  getItem: (key: string) => storageMap.get(key) || null,
  setItem: (key: string, value: string) => {
    storageMap.set(key, String(value));
  },
  removeItem: (key: string) => {
    storageMap.delete(key);
  },
  clear: () => {
    storageMap.clear();
  },
  key: (index: number) => Array.from(storageMap.keys())[index] || null,
  get length() {
    return storageMap.size;
  },
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});
