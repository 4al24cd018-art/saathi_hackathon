# ReportSaathi - Frontend

A healthcare technology web interface for translating medical diagnostic laboratory reports into plain, easy-to-understand language.

## Technology Stack
- **Framework:** React 18
- **Bundler / Tooling:** Vite 5
- **Language:** JavaScript (ES Modules & JSX)
- **Styling:** Tailwind CSS 3
- **Icons:** Lucide React

---

## Key Features & Pages

1. **Landing Page:**
   - ReportSaathi healthcare branding & hero section.
   - Educational mission overview.
   - Interactive 4-step "How It Works" guide.
   - Features highlighting plain-language translations, visual reference intervals, doctor discussion guides, and zero cloud storage.
   - Prominent medical & educational disclaimer.

2. **Dashboard:**
   - Welcome banner and primary action to upload reports.
   - Quick statistics using clearly labelled **DEMO DATA** (sample reports, biomarker count, healthy range %, flags).
   - Recent demo reports cards with category, patient demographics, and 1-click analysis viewer.
   - Helpful instructions on reading lab results and focusing on trends.

3. **Upload Page:**
   - Interactive drag-and-drop file upload zone.
   - Strict validation supporting **PDF, JPG, and PNG** formats up to **10 MB**.
   - Displays selected filename, formatted file size, and remove button.
   - Inline success and error validation feedback.
   - Quick clinical panel shortcuts (CBC, Lipid, LFT, Thyroid Panel).

4. **Loading State:**
   - Animated medical-themed loading indicator.
   - 4-stage simulated progress pipeline (Validating format → Local de-identification → Extracting biomarkers → Compiling educational summaries).
   - Explicit client-side demonstration disclaimer (no false claims of real AI analysis running).

5. **Results Page:**
   - Overview banner with clear **DEMO DATA** badge, date, laboratory name, and overall health status.
   - Plain-language executive summary of the lab report.
   - Extracted biomarkers with **Normal**, **High**, and **Low** status labels.
   - Interactive visual reference range meters.
   - Expandable explanations detailing what each biomarker does and why clinicians test it.
   - Filter bar: *All Biomarkers*, *Outside Range*, *Normal Range*.
   - Copyable **"Questions to Ask Your Doctor"** to empower patient-physician dialogue.
   - General lifestyle and nutrition context notes.
   - Print-friendly layout (`window.print`).

6. **About Page:**
   - Detailed educational mission.
   - Privacy architecture and patient data sovereignty guarantees.
   - Transparent clinical boundaries and medical disclaimer.

---

## How to Run the Project

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation
```bash
cd "C:\Users\4al24\Downloads\4al24cd018 anti\report-saathi\frontend"
npm install
```

### Start Development Server
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

---

## Security & Architecture Notes
- **Local Client Sandbox:** All uploads and simulations run exclusively in the browser memory. No patient files or personal medical data are stored or uploaded to external servers.
- **Backend Boundary Separation:** Demo functionality is kept separate in `src/services/demoService.js`. The future FastAPI client boundary is structured in `src/services/api.js` and remains unconfigured during client demonstration mode.
