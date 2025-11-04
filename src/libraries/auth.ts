// Set Cookie
export const setCookie = (name: string, value: string, minutes: number = 30) => {
  if (typeof document === 'undefined') return;
  const expires = new Date();
  expires.setTime(expires.getTime() + (minutes * 60 * 1000));
  document.cookie = `${name}=${value}; path=/; expires=${expires.toUTCString()}`;
};

// Get Cookie
export const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return;
  return document.cookie
    .split('; ')
    .find(row => row.startsWith(`${name}=`))
    ?.split('=')[1] || null;
};

// Remove Cookie
export const removeCookie = (name: string) => {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
};

// Retrieving User Profile
export async function getProfile(token: string) {
  const res = await fetch('https://api.escuelajs.co/api/v1/auth/profile', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch profile: ${res.status}`);
  }

  return await res.json();
}

// Log Out Function
export const logout = () => {
  if (typeof document === 'undefined') return;
  // Remove DummyJSON authentication cookies
  removeCookie('accessToken');
  removeCookie('refreshToken');

  // Remove any manually set cookies
  removeCookie('auth-token');
  removeCookie('username');
  removeCookie('user-data');

  window.location.href = '/auth';
};