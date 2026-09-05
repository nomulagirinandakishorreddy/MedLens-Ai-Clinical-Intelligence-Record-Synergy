import { describe, it, expect } from 'vitest';
import { escapeHtml, sanitizeInput, safeJsonParse, sanitizeObject, safeStorage } from './security';

describe('Security Utility Module', () => {
  describe('escapeHtml', () => {
    it('escapes HTML special characters correctly', () => {
      const dangerous = '<script>alert("xss")</script>';
      const escaped = escapeHtml(dangerous);
      expect(escaped).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;');
    });

    it('returns empty string for non-string inputs', () => {
      expect(escapeHtml(null as unknown as string)).toBe('');
      expect(escapeHtml(undefined as unknown as string)).toBe('');
    });
  });

  describe('sanitizeInput', () => {
    it('strips script tags completely', () => {
      const malicious = 'Hello <script>alert(1)</script> World';
      expect(sanitizeInput(malicious)).toBe('Hello  World');
    });

    it('removes inline event handlers like onerror or onload', () => {
      const input = '<img src="x" onerror="alert(1)">';
      expect(sanitizeInput(input)).toContain('<img src="x"');
      expect(sanitizeInput(input)).not.toContain('onerror');
    });

    it('removes javascript: URIs', () => {
      const input = 'javascript:alert(1)';
      expect(sanitizeInput(input)).toBe('alert(1)');
    });
  });

  describe('safeJsonParse', () => {
    it('parses valid JSON string', () => {
      const json = '{"name":"John","age":30}';
      const parsed = safeJsonParse(json, {});
      expect(parsed).toEqual({ name: 'John', age: 30 });
    });

    it('returns fallback on invalid JSON', () => {
      const invalidJson = '{name: John}';
      const fallback = { status: 'error' };
      const parsed = safeJsonParse(invalidJson, fallback);
      expect(parsed).toEqual(fallback);
    });

    it('blocks prototype pollution keys', () => {
      const pollutionJson = '{"__proto__":{"admin":true},"name":"Alice"}';
      const parsed = safeJsonParse<{ name: string; admin?: boolean }>(pollutionJson, { name: '' });
      expect(parsed.name).toBe('Alice');
      expect((parsed as Record<string, unknown>).__proto__).not.toEqual({ admin: true });
    });
  });

  describe('sanitizeObject', () => {
    it('sanitizes strings inside nested objects and arrays', () => {
      const dirtyObj = {
        title: 'Report <script>bad()</script>',
        tags: ['<script>xss</script>', 'normal'],
        nested: {
          note: '<img src=x onerror=alert(1)>',
        },
      };

      const clean = sanitizeObject(dirtyObj);
      expect(clean.title).toBe('Report');
      expect(clean.tags[0]).toBe('');
      expect(clean.nested.note).not.toContain('onerror');
    });
  });

  describe('safeStorage', () => {
    it('sets and gets items with medlens_ prefix safely', () => {
      const testData = { patientId: 'P123', name: 'John Doe' };
      safeStorage.setItem('test_profile', testData);

      const retrieved = safeStorage.getItem('test_profile', null);
      expect(retrieved).toEqual(testData);
    });

    it('returns fallback when item does not exist', () => {
      const retrieved = safeStorage.getItem('non_existent', 'default');
      expect(retrieved).toBe('default');
    });
  });
});
