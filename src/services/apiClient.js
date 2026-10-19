export const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
export const STORAGE_KEY = 'abdul_sami_portfolio_v1';
export const AUTH_KEY = 'abdul_sami_auth_v1';
export const THEME_KEY = 'abdul_sami_theme_accent';

export async function authFetch(url, method, body, token) {
  const authToken = token || localStorage.getItem(AUTH_KEY) || (import.meta.env.VITE_DEMO_SESSION_TOKEN || 'demo_admin_session_token_12345');
  try {
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
        'X-Auth-Token': authToken,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
    return await res.json().catch(() => null);
  } catch (e) {
    console.warn('[API Network Error]', e);
    return null;
  }
}

export async function fetchPublicPortfolio() {
  try {
    const res = await fetch(`${API_BASE_URL}/endpoints/portfolio.php`);
    const json = await res.json();
    if (json.status === 'success' && json.data) {
      return json.data;
    }
  } catch (e) {
    console.warn('[Public Portfolio API Offline]', e);
  }
  return null;
}
