from typing import Optional
from app.core.config import settings
from app.schemas.report import ReportAnalysis, ReportCategory, TestParameter

class AIService:
    """
    Core AI orchestration service. Provides realistic mock educational responses
    during Phase 1 and integrates with Gemini API in Phase 2.
    """

    MOCK_CBC_ANALYSIS = ReportAnalysis(
        report_title="Complete Blood Count (CBC) with Differential",
        report_date="Recent Laboratory Panel",
        patient_summary=(
            "Your Complete Blood Count (CBC) evaluates the three primary cellular components of your blood: "
            "red blood cells (which deliver oxygen to your tissues), white blood cells (which help support your immune system), "
            "and platelets (which assist in normal blood clotting). Overall, most parameters are within standard expected limits, "
            "with a minor variation in Hemoglobin that is best discussed with your healthcare provider."
        ),
        categories=[
            ReportCategory(
                category_name="Red Blood Cell Indices (Oxygen Carrying System)",
                description="Measures cells responsible for transporting oxygen throughout your body.",
                tests=[
                    TestParameter(
                        name="Hemoglobin (Hb)",
                        value="11.4",
                        unit="g/dL",
                        reference_range="12.0 - 15.5",
                        status="low",
                        summary="Slightly lower than typical reference range",
                        what_it_means="Hemoglobin is the iron-containing protein inside red blood cells that carries oxygen to muscles and organs. A slightly lower reading can sometimes be associated with low dietary iron, mild fatigue, or routine physical variations."
                    ),
                    TestParameter(
                        name="RBC Count (Red Blood Cells)",
                        value="4.10",
                        unit="million/mcL",
                        reference_range="3.80 - 5.20",
                        status="normal",
                        summary="Within normal healthy range",
                        what_it_means="Represents the total quantity of oxygen-carrying cells circulating in your bloodstream."
                    ),
                    TestParameter(
                        name="Hematocrit (PCV)",
                        value="34.8",
                        unit="%",
                        reference_range="36.0 - 46.0",
                        status="low",
                        summary="Slightly below standard threshold",
                        what_it_means="The percentage of your blood volume made up of red blood cells. Closely mirrors your hemoglobin level."
                    ),
                    TestParameter(
                        name="MCV (Mean Corpuscular Volume)",
                        value="84.9",
                        unit="fL",
                        reference_range="80.0 - 100.0",
                        status="normal",
                        summary="Normal cell size",
                        what_it_means="Measures the physical size of individual red blood cells, indicating healthy cellular proportion."
                    )
                ]
            ),
            ReportCategory(
                category_name="White Blood Cell & Immune Indicators",
                description="Evaluates key defense cells that protect the body against everyday pathogens.",
                tests=[
                    TestParameter(
                        name="Total Leukocyte Count (WBC)",
                        value="6,800",
                        unit="cells/mcL",
                        reference_range="4,500 - 11,000",
                        status="normal",
                        summary="Well within expected healthy bounds",
                        what_it_means="Your overall immune cell count is balanced, indicating that your body is not actively showing signs of elevated systemic stress or severe infection."
                    ),
                    TestParameter(
                        name="Absolute Neutrophils",
                        value="4,200",
                        unit="/mcL",
                        reference_range="1,800 - 7,700",
                        status="normal",
                        summary="Healthy baseline",
                        what_it_means="Neutrophils are the primary initial responders of your immune defense system."
                    ),
                    TestParameter(
                        name="Absolute Lymphocytes",
                        value="2,100",
                        unit="/mcL",
                        reference_range="1,000 - 4,800",
                        status="normal",
                        summary="Healthy baseline",
                        what_it_means="Lymphocytes are specialized cells involved in targeted immune defense and antibody memory."
                    )
                ]
            ),
            ReportCategory(
                category_name="Platelet Count (Clotting Function)",
                description="Monitors cell fragments vital for healthy vascular integrity and blood clotting.",
                tests=[
                    TestParameter(
                        name="Platelet Count",
                        value="245,000",
                        unit="/mcL",
                        reference_range="150,000 - 450,000",
                        status="normal",
                        summary="Optimal clotting parameter",
                        what_it_means="Adequate platelet levels ensure your body can properly seal minor scratches or blood vessel wear."
                    )
                ]
            )
        ],
        key_findings=[
            "White blood cell count and immune defense cells are in a balanced, healthy range.",
            "Platelet counts are optimal for normal blood clotting.",
            "Hemoglobin is mildly below the reference range (11.4 g/dL vs standard 12.0-15.5 g/dL)."
        ],
        questions_for_doctor=[
            "Is my slightly low hemoglobin reading significant given my personal medical history and lifestyle?",
            "Would you recommend checking my serum ferritin, vitamin B12, or folate levels?",
            "Are there any specific iron-rich dietary adjustments that would be beneficial for me?",
            "When would you like to re-test my blood counts to check for stability?"
        ],
        general_lifestyle_notes=[
            "Consider incorporating nutrient-dense foods rich in iron (leafy greens, legumes, seeds) paired with vitamin C (citrus, bell peppers) to support absorption.",
            "Maintain steady daily hydration and consistent sleep hygiene to aid natural energy levels.",
            "Avoid taking iron supplements without explicit medical guidance from your physician."
        ],
        educational_disclaimer=(
            "EDUCATIONAL NOTICE: ReportSaathi provides informational explanations only. "
            "This report is not a diagnosis, does not prescribe treatments or medications, "
            "and does not replace a clinical evaluation by your physician. "
            "Always consult your doctor regarding any abnormal or out-of-range results."
        ),
        is_mock=True
    )

    @classmethod
    async def analyze_document(
        cls,
        extracted_text: str,
        filename: Optional[str] = None,
        is_image: bool = False
    ) -> ReportAnalysis:
        """
        Analyzes laboratory text using either the Mock engine (Phase 1)
        or Gemini API (Phase 2).
        """
        if settings.USE_MOCK_AI or not settings.GEMINI_API_KEY:
            # Return high-fidelity mock response
            response = cls.MOCK_CBC_ANALYSIS.model_copy(deep=True)
            response.filename = filename or "sample_report.pdf"
            response.is_mock = True
            if extracted_text:
                # Store a clean sample preview
                preview_lines = extracted_text.splitlines()[:10]
                response.extracted_text_preview = "\n".join(preview_lines)
            return response

        # Gemini API integration will be implemented in Phase 2
        raise NotImplementedError("Gemini live analysis will be enabled in Phase 2.")
