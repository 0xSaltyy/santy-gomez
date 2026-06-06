export function getOrCreateVisitorId() {
  const key = "santy-gomez-visitor-id";
  const existing = window.localStorage.getItem(key);

  if (existing) {
    return existing;
  }

  const id = crypto.randomUUID();
  window.localStorage.setItem(key, id);

  return id;
}
