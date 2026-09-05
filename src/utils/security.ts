/**
 * MedLens Security Utility Module
 * Provides XSS prevention, safe JSON parsing, input sanitization, and secure storage handling.
 */

// HTML Entity map for escaping dangerous characters
const HTML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;',
};

/**
 * Escapes HTML characters to prevent cross-site scripting (XSS).
 */
export function escapeHtml(str: string): string {
  if (typeof str !== 'string') return '';
  return str.replace(/[&<>"'/]/g, (match) => HTML_ESCAPES[match] || match);
}

/**
 * Strips script tags, inline event handlers (on*), and javascript: URIs.
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/\bon\w+\s*=\s*(?:'[^']*'|"[^"]*"|[^\s>]+)/gi, '')
    .replace(/javascript\s*:/gi, '')
    .trim();
}

/**
 * Safely parses JSON strings and strips prototype pollution vector keys.
 */
export function safeJsonParse<T>(jsonString: string | null, fallback: T): T {
  if (!jsonString) return fallback;
  try {
    const parsed = JSON.parse(jsonString, (key, value) => {
      if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
        return undefined;
      }
      return value;
    });
    return (parsed as T) ?? fallback;
  } catch {
    return fallback;
  }
}

/**
 * Recursively sanitizes string properties in an object.
 */
export function sanitizeObject<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    if (typeof obj === 'string') {
      return sanitizeInput(obj) as unknown as T;
    }
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => sanitizeObject(item)) as unknown as T;
  }

  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
      continue;
    }
    result[key] = sanitizeObject(value);
  }
  return result as T;
}

/**
 * Wrapper around LocalStorage with error boundaries and data validation.
 */
export const safeStorage = {
  getItem<T>(key: string, fallback: T): T {
    try {
      const item = localStorage.getItem(`medlens_${key}`);
      return item ? safeJsonParse<T>(item, fallback) : fallback;
    } catch (e) {
      console.warn(`LocalStorage read blocked for key: ${key}`, e);
      return fallback;
    }
  },

  setItem<T>(key: string, value: T): boolean {
    try {
      const sanitized = sanitizeObject(value);
      localStorage.setItem(`medlens_${key}`, JSON.stringify(sanitized));
      return true;
    } catch (e) {
      console.warn(`LocalStorage write blocked for key: ${key}`, e);
      return false;
    }
  },

  removeItem(key: string): void {
    try {
      localStorage.removeItem(`medlens_${key}`);
    } catch (e) {
      console.warn(`LocalStorage remove blocked for key: ${key}`, e);
    }
  },
};
