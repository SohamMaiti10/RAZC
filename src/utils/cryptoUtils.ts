/**
 * Cryptographic hashing utilities using native Web Crypto API
 */

export async function computeSHA256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

export function formatHash(hash: string, start = 8, end = 8): string {
  if (!hash || hash.length <= start + end) return hash || '';
  return `${hash.substring(0, start)}...${hash.substring(hash.length - end)}`;
}
