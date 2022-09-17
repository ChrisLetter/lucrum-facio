export function isAuthenticated() {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return false;
  }
  const state = localStorage.getItem('persist:root');
  if (state) {
    const parsedState = JSON.parse(state);
    if (
      !parsedState.hasOwnProperty('holdings') ||
      !parsedState.hasOwnProperty('username')
    ) {
      return false;
    }
  }
  return true;
}
