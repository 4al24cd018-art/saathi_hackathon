from typing import List, Optional
from pydantic import BaseModel, Field

class TestParameter(BaseModel):
    name: str = Field(..., description="Common or standard medical test name")
    value: str = Field(..., description="Observed result value from report")
    unit: str = Field("", description="Measurement unit (e.g., mg/dL, g/dL, %)")
    reference_range: str = Field("", description="Standard laboratory reference or normal range")
    status: str = Field("normal", description="'normal', 'high', 'low', 'borderline', or 'attention'")
    summary: str = Field(..., description="Short one-line status indicator")
    what_it_means: str = Field(..., description="Simple, jargon-free explanation of this parameter's function in the body")

class ReportCategory(BaseModel):
    category_name: str = Field(..., description="Panel name, e.g., 'Complete Blood Count (CBC)' or 'Lipid Profile'")
    description: Optional[str] = Field(None, description="Brief educational summary of what this panel measures")
    tests: List[TestParameter] = Field(default_factory=list)

class ReportAnalysis(BaseModel):
    report_title: str = Field("Laboratory Test Report Analysis", description="Identified report type or title")
    report_date: Optional[str] = Field(None, description="Report date if detected (anonymized)")
    patient_summary: str = Field(..., description="Plain-language educational summary of the overall lab report")
    categories: List[ReportCategory] = Field(default_factory=list)
    key_findings: List[str] = Field(default_factory=list, description="Key bullet points summarizing observed values")
    questions_for_doctor: List[str] = Field(default_factory=list, description="Helpful, non-alarmist questions for the doctor")
    general_lifestyle_notes: List[str] = Field(default_factory=list, description="General educational wellness pointers")
    educational_disclaimer: str = Field(
        default="EDUCATIONAL DISCLAIMER: ReportSaathi provides automated plain-language explanations of laboratory data for general educational purposes only. It is NOT a medical diagnosis, does NOT prescribe treatments, and must never replace direct consultation with a qualified medical professional.",
        description="Mandatory medical and educational disclaimer"
    )
    is_mock: bool = Field(False, description="Flag indicating if the response is generated via mock engine")
    filename: Optional[str] = Field(None, description="Original uploaded filename")
    extracted_text_preview: Optional[str] = Field(None, description="De-identified sample of extracted raw text")
