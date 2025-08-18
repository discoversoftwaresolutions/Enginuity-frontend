import { fetchData } from "../utils/apiClient";

const API_BASE_URL = "https://enginuity-production.up.railway.app";

// Function to fetch supersonic boom calculations
export async function getWavefronts(mach: number, altitude_ft: number) {
    try {
        const response = await fetchData(`${API_BASE_URL}/wavefronts`, "POST", { mach, altitude_ft });
        return response;
    } catch (error) {
        console.error("Error fetching wavefronts:", error);
        return { error: "Failed to fetch wavefront data" };
    }
}

// Function to compute orbital mechanics
export async function getOrbit(semiMajorAxis: number, eccentricity: number, inclination: number) {
    try {
        const response = await fetchData(`${API_BASE_URL}/orbit`, "POST", { semiMajorAxis, eccentricity, inclination });
        return response;
    } catch (error) {
        console.error("Error fetching orbital data:", error);
        return { error: "Failed to fetch orbital data" };
    }
}

// Function to compute Hohmann Transfer
export async function getHohmannTransfer(initialRadius: number, targetRadius: number) {
    try {
        const response = await fetchData(`${API_BASE_URL}/hohmann-transfer`, "POST", { r1_km: initialRadius, r2_km: targetRadius });
        return response;
    } catch (error) {
        console.error("Error fetching Hohmann transfer data:", error);
        return { error: "Failed to fetch transfer data" };
    }
}

// Function to get CFD analysis data
export async function getCFDAnalysis(parameters: any) {
    try {
        const response = await fetchData(`${API_BASE_URL}/cfd-analysis`, "POST", parameters);
        return response;
    } catch (error) {
        console.error("Error fetching CFD analysis:", error);
        return { error: "Failed to fetch CFD analysis" };
    }
}

// Function to get flight envelope data
export async function getFlightEnvelope(aircraft_type: string, conditions: any) {
    try {
        const response = await fetchData(`${API_BASE_URL}/flight-envelope`, "POST", { aircraft_type, conditions });
        return response;
    } catch (error) {
        console.error("Error fetching flight envelope:", error);
        return { error: "Failed to fetch flight envelope data" };
    }
}
