const INSTAGRAM_USERNAME_REGEX = /^[a-zA-Z0-9._]{1,30}$/;

export function sanitizeInstagramUsername(input?: string): string | null {
  if (!input) return null;
  const cleaned = input.replace(/@/g, "").trim();
  if (!cleaned || !INSTAGRAM_USERNAME_REGEX.test(cleaned)) return null;
  return cleaned;
}
