const TOKEN_KEY = "nimbus3d_admin_token";
const EMAIL_KEY = "nimbus3d_admin_email";

export function getToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setSession(token: string, email: string) {
  window.localStorage.setItem(TOKEN_KEY, token);
  window.localStorage.setItem(EMAIL_KEY, email);
}

export function getAdminEmail() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(EMAIL_KEY);
}

export function clearSession() {
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(EMAIL_KEY);
}
