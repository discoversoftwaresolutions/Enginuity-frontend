export function createSocket(url: string, protocols?: string | string[]) {
  return new window.WebSocket(url, protocols);
}
