export const SAMPLE_REPORTS = [
  {
    id: "cbc-01",
    title: "Complete Blood Count (CBC) with Differential",
    reportDate: "12 Oct 2026",
    labName: "Metro Healthcare Diagnostics (Demo Lab)",
    category: "Hematology",
    patientAgeGender: "38 / Female (Fictional Profile)",
    summary:
      "Your Complete Blood Count (CBC) measures the cells circulating in your blood. Overall, your immune cells (white blood cells) and clotting cells (platelets) are healthy and well-balanced. However, your hemoglobin and hematocrit are slightly below standard thresholds, suggesting mild iron-deficiency anemia which you should discuss with your doctor.",
    overallStatus: "attention",
    isDemoData: true,
    keyFindings: [
      "White blood cell count and immune defense cells are within normal healthy ranges.",
      "Platelet count is optimal, indicating normal blood clotting capability.",
      "Hemoglobin is mildly reduced (11.2 g/dL vs. standard 12.0 - 15.5 g/dL).",
      "Red blood cell size (MCV) is slightly lower than normal, often linked to iron availability."
    ],
    categories: [
      {
        categoryName: "Red Blood Cells & Oxygen Delivery",
        description: "Evaluates red blood cells, which carry vital oxygen from your lungs to the rest of your body.",
        tests: [
          {
            name: "Hemoglobin (Hb)",
            value: "11.2",
            unit: "g/dL",
            referenceRange: "12.0 - 15.5",
            status: "low",
            minVal: 9.0,
            maxVal: 18.0,
            refMin: 12.0,
            refMax: 15.5,
            numVal: 11.2,
            summary: "Slightly below standard female reference range",
            whatItMeans:
              "Hemoglobin is the oxygen-binding iron protein in red blood cells. A slightly low value means less oxygen may reach tissues, which can cause subtle fatigue or cold intolerance.",
            clinicalRelevance: "Commonly associated with low dietary iron intake or routine menstrual blood loss."
          },
          {
            name: "RBC Count (Red Blood Cells)",
            value: "4.05",
            unit: "million/mcL",
            referenceRange: "3.80 - 5.20",
            status: "normal",
            minVal: 3.0,
            maxVal: 6.0,
            refMin: 3.8,
            refMax: 5.2,
            numVal: 4.05,
            summary: "Healthy count of circulating oxygen-carrying cells",
            whatItMeans: "The total number of red blood cells in your bloodstream. This count is in the normal range.",
            clinicalRelevance: "Indicates adequate bone marrow production of red cells."
          },
          {
            name: "Hematocrit (PCV)",
            value: "33.8",
            unit: "%",
            referenceRange: "36.0 - 46.0",
            status: "low",
            minVal: 28.0,
            maxVal: 52.0,
            refMin: 36.0,
            refMax: 46.0,
            numVal: 33.8,
            summary: "Slightly lower volume fraction of blood cells",
            whatItMeans: "The percentage of your total blood volume made up of red blood cells. Closely mirrors hemoglobin levels.",
            clinicalRelevance: "Correlates with mild anemia."
          },
          {
            name: "MCV (Mean Corpuscular Volume)",
            value: "78.4",
            unit: "fL",
            referenceRange: "80.0 - 100.0",
            status: "low",
            minVal: 65.0,
            maxVal: 110.0,
            refMin: 80.0,
            refMax: 100.0,
            numVal: 78.4,
            summary: "Red blood cells are slightly smaller than average (microcytic)",
            whatItMeans: "Measures the physical volume of an individual red blood cell. Smaller cells often appear when iron stores are modest.",
            clinicalRelevance: "Classic early indicator of low ferritin or iron reserves."
          }
        ]
      },
      {
        categoryName: "White Blood Cells & Immune Defense",
        description: "Monitors immune defense cells that safeguard against infections, inflammation, and cellular stress.",
        tests: [
          {
            name: "Total Leukocyte Count (WBC)",
            value: "6,900",
            unit: "cells/mcL",
            referenceRange: "4,500 - 11,000",
            status: "normal",
            minVal: 3000,
            maxVal: 13000,
            refMin: 4500,
            refMax: 11000,
            numVal: 6900,
            summary: "Optimal immune cell baseline",
            whatItMeans: "Your immune system has a balanced population of patrol cells, without evidence of active bacterial infection.",
            clinicalRelevance: "Shows absence of acute leukocytosis or leukopenia."
          },
          {
            name: "Absolute Neutrophils",
            value: "4,100",
            unit: "/mcL",
            referenceRange: "1,800 - 7,700",
            status: "normal",
            minVal: 1000,
            maxVal: 9000,
            refMin: 1800,
            refMax: 7700,
            numVal: 4100,
            summary: "Standard first-responder cell count",
            whatItMeans: "Neutrophils are the quick-response cells that neutralize bacteria.",
            clinicalRelevance: "Normal immune defense readiness."
          },
          {
            name: "Absolute Lymphocytes",
            value: "2,200",
            unit: "/mcL",
            referenceRange: "1,000 - 4,800",
            status: "normal",
            minVal: 800,
            maxVal: 5500,
            refMin: 1000,
            refMax: 4800,
            numVal: 2200,
            summary: "Healthy adaptive immune balance",
            whatItMeans: "Lymphocytes manage virus defense and build antibodies for long-term immunity.",
            clinicalRelevance: "Normal viral surveillance capacity."
          }
        ]
      },
      {
        categoryName: "Platelets & Clotting Function",
        description: "Evaluates tiny cell fragments that seal micro-tears in blood vessels to stop bleeding.",
        tests: [
          {
            name: "Platelet Count",
            value: "250,000",
            unit: "/mcL",
            referenceRange: "150,000 - 450,000",
            status: "normal",
            minVal: 100000,
            maxVal: 500000,
            refMin: 150000,
            refMax: 450000,
            numVal: 250000,
            summary: "Normal clotting capability",
            whatItMeans: "Adequate platelets ensure your body can stop bleeding smoothly after routine bumps or cuts.",
            clinicalRelevance: "No risk of spontaneous bleeding or abnormal hypercoagulation indicated."
          }
        ]
      }
    ],
    questionsForDoctor: [
      "Could my slightly lower hemoglobin explain why I feel mild afternoon fatigue?",
      "Would you recommend checking my serum ferritin (stored iron) or vitamin B12 levels?",
      "Are there dietary modifications (like combining leafy greens with vitamin C) you'd recommend first before any supplements?",
      "When should I repeat this test to check if my red blood cell indices have stabilized?"
    ],
    lifestyleNotes: [
      "Include natural iron-rich foods in your meals: spinach, lentils, chickpeas, pumpkin seeds, and beans.",
      "Pair non-heme plant iron with citrus fruits, tomatoes, or bell peppers to double iron absorption.",
      "Avoid drinking black tea or coffee right during or within 45 minutes of iron-heavy meals, as tannins hinder absorption.",
      "Ensure consistent 7-8 hours of restful sleep to assist natural red blood cell regeneration."
    ]
  },
  {
    id: "lipid-02",
    title: "Lipid Profile (Cardiovascular Risk Screen)",
    reportDate: "28 Oct 2026",
    labName: "Apex Clinical Research Laboratories (Demo Lab)",
    category: "Biochemistry",
    patientAgeGender: "46 / Male (Fictional Profile)",
    summary:
      "This lipid panel evaluates fats and cholesterol in your bloodstream. Your protective 'good' HDL cholesterol is at a healthy baseline. However, your total cholesterol and LDL ('bad' cholesterol) are borderline elevated, which offers a great opportunity for lifestyle adjustments such as increased dietary soluble fiber and regular aerobic activity.",
    overallStatus: "borderline",
    isDemoData: true,
    keyFindings: [
      "HDL ('Good') cholesterol is in a healthy, heart-protective range (52 mg/dL).",
      "Total cholesterol is borderline high (215 mg/dL vs. recommended < 200 mg/dL).",
      "LDL ('Bad') cholesterol is mildly elevated at 138 mg/dL.",
      "Triglycerides are within the acceptable normal range (135 mg/dL)."
    ],
    categories: [
      {
        categoryName: "Cholesterol & Lipoprotein Fractions",
        description: "Key fats circulating in blood vessels that influence long-term arterial health.",
        tests: [
          {
            name: "Total Cholesterol",
            value: "215",
            unit: "mg/dL",
            referenceRange: "< 200",
            status: "high",
            minVal: 120,
            maxVal: 300,
            refMin: 120,
            refMax: 200,
            numVal: 215,
            summary: "Borderline elevated overall cholesterol",
            whatItMeans: "The sum of all cholesterol types circulating in your blood. Elevated numbers warrant proactive attention.",
            clinicalRelevance: "Commonly influenced by dietary saturated fats, physical activity level, and genetics."
          },
          {
            name: "HDL Cholesterol ('Good')",
            value: "52",
            unit: "mg/dL",
            referenceRange: "> 40",
            status: "normal",
            minVal: 20,
            maxVal: 80,
            refMin: 40,
            refMax: 80,
            numVal: 52,
            summary: "Cardioprotective range",
            whatItMeans: "HDL gathers excess cholesterol from arterial walls and ferries it back to the liver for clearance.",
            clinicalRelevance: "Higher HDL values help buffer against plaque build-up."
          },
          {
            name: "LDL Cholesterol ('Bad')",
            value: "138",
            unit: "mg/dL",
            referenceRange: "< 100 (Optimal)",
            status: "high",
            minVal: 50,
            maxVal: 200,
            refMin: 50,
            refMax: 100,
            numVal: 138,
            summary: "Borderline high LDL particle density",
            whatItMeans: "Carries cholesterol into circulation. Over time, high levels can form deposits on vessel linings.",
            clinicalRelevance: "Can often be managed with plant sterols, exercise, and dietary fiber."
          },
          {
            name: "Triglycerides",
            value: "135",
            unit: "mg/dL",
            referenceRange: "< 150",
            status: "normal",
            minVal: 50,
            maxVal: 300,
            refMin: 50,
            refMax: 150,
            numVal: 135,
            summary: "Healthy baseline fat storage marker",
            whatItMeans: "The primary form of dietary fat stored for energy. Well within the desirable zone.",
            clinicalRelevance: "Shows balanced carbohydrate and caloric utilization."
          }
        ]
      }
    ],
    questionsForDoctor: [
      "Based on my overall family history, what is my recommended target LDL level?",
      "Would you suggest a 3-month trial of dietary changes and exercise before considering medications?",
      "Would calculating an ASCVD 10-year risk score be helpful for my age bracket?",
      "Should we schedule a follow-up lipid re-check in 3 to 6 months?"
    ],
    lifestyleNotes: [
      "Incorporate soluble fiber: oats, barley, chia seeds, apples, and beans bind cholesterol in the digestive tract.",
      "Aim for at least 150 minutes of moderate aerobic exercise (brisk walking, swimming, cycling) per week.",
      "Swap saturated cooking fats (butter, palm oil) for heart-healthy unsaturated alternatives (extra virgin olive oil, avocado).",
      "Include omega-3 fatty acids from walnuts, flaxseeds, or oily fish twice weekly."
    ]
  },
  {
    id: "lft-03",
    title: "Comprehensive Liver Function Test (LFT)",
    reportDate: "05 Nov 2026",
    labName: "Global Diagnostic & Wellness Centre (Demo Lab)",
    category: "Biochemistry",
    patientAgeGender: "32 / Male (Fictional Profile)",
    summary:
      "Your liver function panel tests key enzymes, proteins, and bilirubin that reflect how well your liver filters metabolic byproducts and produces vital proteins. All your liver enzymes (ALT, AST, ALP), total protein, and bilirubin levels are completely normal, indicating excellent hepatic health.",
    overallStatus: "normal",
    isDemoData: true,
    keyFindings: [
      "ALT (SGPT) and AST (SGOT) enzymes are in the healthy baseline range.",
      "Total Bilirubin is normal, reflecting smooth processing of red cell breakdown products.",
      "Albumin and total protein are well maintained, showing good nutritional status.",
      "No indications of liver inflammation or biliary obstruction."
    ],
    categories: [
      {
        categoryName: "Hepatic Enzymes & Clearance",
        description: "Enzymes that indicate liver cell structural integrity and bile duct flow.",
        tests: [
          {
            name: "ALT / SGPT (Alanine Aminotransferase)",
            value: "24",
            unit: "U/L",
            referenceRange: "7 - 45",
            status: "normal",
            minVal: 0,
            maxVal: 80,
            refMin: 7,
            refMax: 45,
            numVal: 24,
            summary: "Optimal liver enzyme level",
            whatItMeans: "An enzyme primarily concentrated inside liver cells. Normal levels show healthy liver cell integrity.",
            clinicalRelevance: "No acute hepatocellular injury detected."
          },
          {
            name: "AST / SGOT (Aspartate Aminotransferase)",
            value: "22",
            unit: "U/L",
            referenceRange: "8 - 40",
            status: "normal",
            minVal: 0,
            maxVal: 70,
            refMin: 8,
            refMax: 40,
            numVal: 22,
            summary: "Normal baseline enzyme level",
            whatItMeans: "An enzyme found in liver and muscle cells. Completely within normal parameters.",
            clinicalRelevance: "Reassuring indicator of liver and muscular wellness."
          },
          {
            name: "Total Bilirubin",
            value: "0.8",
            unit: "mg/dL",
            referenceRange: "0.2 - 1.2",
            status: "normal",
            minVal: 0.1,
            maxVal: 2.5,
            refMin: 0.2,
            refMax: 1.2,
            numVal: 0.8,
            summary: "Healthy bilirubin clearance",
            whatItMeans: "Yellow compound created during the natural recycling of old red blood cells.",
            clinicalRelevance: "Normal bile drainage with no jaundice concerns."
          },
          {
            name: "Serum Albumin",
            value: "4.4",
            unit: "g/dL",
            referenceRange: "3.5 - 5.2",
            status: "normal",
            minVal: 2.5,
            maxVal: 6.0,
            refMin: 3.5,
            refMax: 5.2,
            numVal: 4.4,
            summary: "Strong protein synthesis capability",
            whatItMeans: "The primary circulating protein that maintains osmotic pressure and carries nutrients.",
            clinicalRelevance: "Reflects healthy hepatic synthesis and balanced dietary nutrition."
          }
        ]
      }
    ],
    questionsForDoctor: [
      "Everything appears normal on my liver panel—do you recommend keeping my routine annual checkup cadence?",
      "Are there any specific dietary or lifestyle practices you advise to maintain this healthy baseline?",
      "Does this result align well with my other routine health screens?"
    ],
    lifestyleNotes: [
      "Continue staying well-hydrated throughout the day to support ongoing hepatic filtration.",
      "Limit high-fructose corn syrups and ultra-processed snacks to keep liver fat storage low.",
      "Ensure moderation with alcohol and consult a pharmacist before combining over-the-counter pain relievers."
    ]
  },
  {
    id: "tft-04",
    title: "Thyroid & Glycemic Health Panel",
    reportDate: "10 Nov 2026",
    labName: "Pinnacle Endocrinology Labs (Demo Lab)",
    category: "Endocrinology",
    patientAgeGender: "41 / Female (Fictional Profile)",
    summary:
      "This metabolic screening evaluates your thyroid stimulating hormone alongside blood sugar regulation indicators. Your thyroid hormone levels are in balance, while your HbA1c points to prediabetes territory (5.8%), meaning targeted lifestyle modifications can help prevent progression.",
    overallStatus: "attention",
    isDemoData: true,
    keyFindings: [
      "TSH (Thyroid Stimulating Hormone) is well balanced (2.15 uIU/mL), showing healthy thyroid regulation.",
      "Fasting Blood Glucose is mildly elevated at 106 mg/dL (optimal < 100 mg/dL).",
      "HbA1c is 5.8% (Borderline / Prediabetes range 5.7% - 6.4%).",
      "Kidney filtration marker (Serum Creatinine) is normal at 0.85 mg/dL."
    ],
    categories: [
      {
        categoryName: "Thyroid Regulation Markers",
        description: "Assesses how well your pituitary gland and thyroid communicate to control metabolism.",
        tests: [
          {
            name: "TSH (Thyroid Stimulating Hormone)",
            value: "2.15",
            unit: "uIU/mL",
            referenceRange: "0.45 - 4.50",
            status: "normal",
            minVal: 0.1,
            maxVal: 6.0,
            refMin: 0.45,
            refMax: 4.5,
            numVal: 2.15,
            summary: "Euthyroid (balanced thyroid stimulation)",
            whatItMeans: "Produced by the pituitary gland to instruct your thyroid gland how much hormone to produce.",
            clinicalRelevance: "Indicates normal baseline metabolic signaling."
          },
          {
            name: "Free T4 (Thyroxine)",
            value: "1.25",
            unit: "ng/dL",
            referenceRange: "0.82 - 1.77",
            status: "normal",
            minVal: 0.5,
            maxVal: 2.5,
            refMin: 0.82,
            refMax: 1.77,
            numVal: 1.25,
            summary: "Optimal active circulating hormone",
            whatItMeans: "The active form of thyroid hormone available to regulate energy expenditure and warmth.",
            clinicalRelevance: "Confirms healthy thyroid glandular production."
          }
        ]
      },
      {
        categoryName: "Blood Sugar & Metabolic Regulation",
        description: "Measures short-term fasting glucose and estimated 90-day average blood sugar control.",
        tests: [
          {
            name: "Fasting Blood Glucose",
            value: "106",
            unit: "mg/dL",
            referenceRange: "70 - 99",
            status: "high",
            minVal: 50,
            maxVal: 200,
            refMin: 70,
            refMax: 99,
            numVal: 106,
            summary: "Mildly above optimal fasting threshold",
            whatItMeans: "Measures circulating glucose after an 8 to 12 hour overnight fast.",
            clinicalRelevance: "Slightly elevated fasting values indicate early insulin resistance."
          },
          {
            name: "HbA1c (Glycated Hemoglobin)",
            value: "5.8",
            unit: "%",
            referenceRange: "< 5.7 (Normal)",
            status: "high",
            minVal: 4.0,
            maxVal: 10.0,
            refMin: 4.0,
            refMax: 5.6,
            numVal: 5.8,
            summary: "Prediabetes range (5.7% - 6.4%)",
            whatItMeans: "Reflects the average proportion of hemoglobin cells bound to sugar over the past 2 to 3 months.",
            clinicalRelevance: "Early reversible warning window for nutrition and physical movement improvements."
          },
          {
            name: "Serum Creatinine",
            value: "0.85",
            unit: "mg/dL",
            referenceRange: "0.50 - 1.10",
            status: "normal",
            minVal: 0.3,
            maxVal: 2.0,
            refMin: 0.5,
            refMax: 1.1,
            numVal: 0.85,
            summary: "Healthy renal filtration rate",
            whatItMeans: "Metabolic breakdown byproduct of muscle tissue cleared entirely by functioning kidneys.",
            clinicalRelevance: "Shows normal kidney function."
          }
        ]
      }
    ],
    questionsForDoctor: [
      "Given my HbA1c is 5.8%, what dietary changes would be most effective in reversing prediabetes?",
      "Should I consider using a home glucometer or continuous glucose monitor (CGM) for educational tracking?",
      "Would you recommend checking fasting insulin levels or a lipid profile in tandem?",
      "How soon should we re-test my HbA1c (e.g. 3 or 6 months)?"
    ],
    lifestyleNotes: [
      "Emphasize protein and fiber before carbohydrates at meals to flatten post-meal glucose spikes.",
      "Take a 10 to 15 minute casual stroll immediately following lunch and dinner to promote muscular glucose uptake.",
      "Prioritize consistent 7+ hours of sleep, as sleep fragmentation directly drives morning insulin resistance.",
      "Stay hydrated with water and herbal infusions in place of sweetened beverages or fruit juices."
    ]
  }
];
