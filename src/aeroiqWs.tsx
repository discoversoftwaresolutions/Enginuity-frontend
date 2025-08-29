
const DEFAULT_API_BASE_URL = "wss://enginuity-production.up.railway.app/aeroiq";

/**
 * Sends a JSON command to an AeroIQ WebSocket endpoint and resolves with the first message.
 * Browser-safe: uses window.WebSocket (no Node 'ws' import).
 */
export async function sendAeroIQCommand(
  uri: string = DEFAULT_API_BASE_URL,
  payload: unknown,
  timeout = 10000
): Promise<any> {
  return new Promise((resolve, reject) => {
    const ws = new window.WebSocket(uri);

    let finished = false;
    const finish = (fn: () => void) => {
      if (finished) return;
      finished = true;
      try { ws.close(); } catch {}
      fn();
    };

    ws.onopen = () => {
      try {
        ws.send(JSON.stringify(payload));
      } catch {
        finish(() => reject({ error: "Failed to serialize payload" }));
      }
    };

    ws.onmessage = (event) => {
      finish(() => {
        try {
          resolve(JSON.parse(event.data as string));
        } catch {
          resolve({ raw: event.data });
        }
      });
    };

    ws.onerror = () => {
      finish(() => reject({ error: "WebSocket error" }));
    };

    ws.onclose = () => {
      // If it closes before we finish, ensure we reject once
      finish(() => reject({ error: "Connection closed before response" }));
    };

    // Timeout guard
    const timer = setTimeout(() => finish(() => reject({ error: "Timeout waiting for response" })), timeout);

    // Clear timeout once we finish (resolve or reject)
    const clear = () => clearTimeout(timer);
    ws.addEventListener("close", clear, { once: true });
    ws.addEventListener("error", clear, { once: true });
    ws.addEventListener("message", clear, { once: true });
    ws.addEventListener("open", () => {}, { once: true });
  });
}
