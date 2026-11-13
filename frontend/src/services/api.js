/**
 * ReportSaathi API Service (Placeholder / Boundary)
 *
 * NOTE: As per project specifications:
 * - This frontend currently operates in CLIENT-SIDE DEMO MODE.
 * - No active connection to FastAPI or Gemini is established yet.
 * - When FastAPI backend is ready, this module will provide the endpoints
 *   for real multipart uploads and secure token exchange.
 */

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  IS_DEMO_MODE: true,
};

/**
 * Upload and analyze lab report via FastAPI (Future Integration)
 * @param {File} file - The medical report file (PDF, JPG, PNG)
 * @returns {Promise<never>}
 */
export async function analyzeReportViaApi(file) {
  throw new Error(
    'Backend API is currently disconnected. ReportSaathi is operating in client-side demonstration mode.'
  );
}

/**
 * Health check endpoint (Future Integration)
 */
export async function checkApiHealth() {
  return { status: 'demo_mode', message: 'Client demo active without external API dependencies.' };
}
