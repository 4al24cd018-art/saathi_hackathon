import { SAMPLE_REPORTS } from '../data/sampleReports';

/**
 * File validation constraints
 */
export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
export const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/jpg',
  'image/png'
];

export const ALLOWED_EXTENSIONS = ['.pdf', '.jpg', '.jpeg', '.png'];

/**
 * Validates an uploaded lab report file.
 * Returns { valid: boolean, error: string | null }
 */
export function validateReportFile(file) {
  if (!file) {
    return { valid: false, error: 'Please choose or drag a medical lab report file.' };
  }

  // Check file extension
  const fileName = file.name.toLowerCase();
  const hasValidExtension = ALLOWED_EXTENSIONS.some((ext) => fileName.endsWith(ext));
  const hasValidMime = ALLOWED_MIME_TYPES.includes(file.type.toLowerCase()) || hasValidExtension;

  if (!hasValidMime) {
    return {
      valid: false,
      error: `Unsupported format "${file.name}". Please upload a PDF, JPG, or PNG document.`
    };
  }

  // Check file size (10 MB max)
  if (file.size > MAX_FILE_SIZE_BYTES) {
    const sizeInMb = (file.size / (1024 * 1024)).toFixed(1);
    return {
      valid: false,
      error: `File is too large (${sizeInMb} MB). Maximum supported file size is 10 MB.`
    };
  }

  if (file.size === 0) {
    return {
      valid: false,
      error: 'The selected file is empty. Please choose a valid document.'
    };
  }

  return { valid: true, error: null };
}

/**
 * Formats byte size into human readable string.
 */
export function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

/**
 * Simulated analysis stages for local demonstration
 */
export const DEMO_PROCESSING_STAGES = [
  {
    step: 1,
    title: 'Validating Document Format',
    description: 'Checking file structure, dimensions, and readability',
    duration: 600
  },
  {
    step: 2,
    title: 'Simulating Local De-identification',
    description: 'Filtering patient name, phone numbers, and lab reference codes',
    duration: 700
  },
  {
    step: 3,
    title: 'Extracting Laboratory Biomarkers',
    description: 'Mapping test names to reference range standards',
    duration: 700
  },
  {
    step: 4,
    title: 'Compiling Plain-Language Educational Summary',
    description: 'Formulating doctor discussion prompts and lifestyle notes',
    duration: 600
  }
];

/**
 * Simulates analyzing an uploaded file in client-side demo mode.
 * Takes a file object, calls onProgress(stageIndex, stage),
 * and resolves with a realistic fictional sample report tailored with the uploaded filename.
 */
export async function simulateDemoAnalysis(file, onProgress) {
  for (let i = 0; i < DEMO_PROCESSING_STAGES.length; i++) {
    const stage = DEMO_PROCESSING_STAGES[i];
    if (onProgress) {
      onProgress(i, stage);
    }
    await new Promise((resolve) => setTimeout(resolve, stage.duration));
  }

  // Determine a realistic template report based on filename cues or default to CBC
  const lowerName = file.name.toLowerCase();
  let baseReport = SAMPLE_REPORTS[0]; // CBC default

  if (lowerName.includes('lipid') || lowerName.includes('cholesterol') || lowerName.includes('cardio')) {
    baseReport = SAMPLE_REPORTS[1];
  } else if (lowerName.includes('liver') || lowerName.includes('lft') || lowerName.includes('hepatic')) {
    baseReport = SAMPLE_REPORTS[2];
  } else if (lowerName.includes('thyroid') || lowerName.includes('tft') || lowerName.includes('metabolic') || lowerName.includes('sugar')) {
    baseReport = SAMPLE_REPORTS[3] || SAMPLE_REPORTS[0];
  }

  const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');

  return {
    ...baseReport,
    id: `custom-demo-${Date.now()}`,
    title: `${cleanName} (Analyzed Sample)`,
    reportDate: new Date().toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }),
    isCustomUpload: true,
    uploadedFileName: file.name,
    uploadedFileSize: formatBytes(file.size),
    isDemoData: true
  };
}
