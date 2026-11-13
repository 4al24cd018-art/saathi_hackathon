import sys
import os

# Ensure backend root is on sys.path
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

def test_deidentification():
    from app.services.extractor import DocumentExtractor
    sample_text = (
        "Patient Name: John Doe\n"
        "MRN: 987654321\n"
        "Phone: +1 555-234-5678\n"
        "Email: patient.john@example.com\n"
        "Address: 123 Health Ave, Metropolis\n"
        "Hemoglobin: 11.4 g/dL (Reference: 12.0 - 15.5)"
    )
    cleaned = DocumentExtractor.deidentify_text(sample_text)
    print("Testing PII Redaction:")
    assert "[REDACTED_NAME]" in cleaned, "Patient name was not redacted"
    assert "[REDACTED_ID]" in cleaned, "MRN was not redacted"
    assert "[REDACTED_PHONE]" in cleaned, "Phone was not redacted"
    assert "[REDACTED_EMAIL]" in cleaned, "Email was not redacted"
    assert "Hemoglobin: 11.4 g/dL" in cleaned, "Clinical values were unintentionally modified"
    print("  -> PII Redaction PASSED")

def test_schema_and_mock_service():
    import asyncio
    from app.services.ai_service import AIService
    
    async def run():
        res = await AIService.analyze_document(
            extracted_text="Hemoglobin 11.4 g/dL",
            filename="cbc_test.pdf"
        )
        assert res.report_title is not None
        assert len(res.categories) > 0
        assert len(res.questions_for_doctor) > 0
        assert "EDUCATIONAL" in res.educational_disclaimer.upper()
        assert res.is_mock is True
        print("  -> Schema & Mock AI Service PASSED")

    asyncio.run(run())

if __name__ == "__main__":
    print("Running Phase 1 Verification Tests...")
    test_deidentification()
    test_schema_and_mock_service()
    print("All Phase 1 unit tests passed successfully!")
