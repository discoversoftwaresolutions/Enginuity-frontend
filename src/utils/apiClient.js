/**
 * Fetch wavefront data from the API.
 * @returns {Promise<object>} - The retrieved wavefront data.
 */
async function getWavefronts() {
    const baseUrl = "https://your-api.com"; // Replace with actual API URL
    const endpoint = "/wavefronts";

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.API_TOKEN}` // Secure token handling
    };

    try {
        const response = await fetch(`${baseUrl}${endpoint}`, { method: "GET", headers });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (!data || typeof data !== "object") {
            throw new Error("Invalid JSON response from API");
        }

        return data;
    } catch (error) {
        console.error("Failed to fetch wavefront data:", error);
        throw error;
    }
}
