from fastapi import APIRouter, UploadFile, File, HTTPException, status
from app.services.extractor import DocumentExtractor
from app.services.ai_service import AIService
from app.schemas.report import ReportAnalysis

router = APIRouter(prefix="/api", tags=["Report Analysis"])

ALLOWED_EXTENSIONS = {".pdf", ".png", ".jpg", ".jpeg", ".webp"}
MAX_FILE_SIZE_BYTES = 15 * 1024 * 1024  # 15 MB limit

@router.post(
    "/analyze",
    response_model=ReportAnalysis,
    summary="Upload and analyze a medical laboratory report"
)
async def analyze_report(file: UploadFile = File(...)):
    """
    Accepts laboratory reports in PDF, PNG, JPG, or WEBP format.
    Extracts text, strips patient PII, and returns a structured educational breakdown.
    """
    if not file.filename:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No filename provided in upload request."
        )

    filename_lower = file.filename.lower()
    file_ext = None
    for ext in ALLOWED_EXTENSIONS:
        if filename_lower.endswith(ext):
            file_ext = ext
            break

    if not file_ext:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unsupported file format '{file.filename}'. Allowed formats: PDF, PNG, JPG, JPEG, WEBP."
        )

    # Read uploaded file contents
    content = await file.read()
    if len(content) == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="The uploaded file is empty."
        )
    if len(content) > MAX_FILE_SIZE_BYTES:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail="File size exceeds the 15 MB limit."
        )

    extracted_text = ""
    is_image = False

    try:
        if file_ext == ".pdf":
            extracted_text, page_count = DocumentExtractor.extract_from_pdf(content)
        else:
            is_image = True
            metadata, sanitized_bytes = DocumentExtractor.inspect_image(content)
            extracted_text = f"[Image Report: {metadata['format']} {metadata['width']}x{metadata['height']} px]"

        # Process through educational AI analysis service
        analysis = await AIService.analyze_document(
            extracted_text=extracted_text,
            filename=file.filename,
            is_image=is_image
        )
        return analysis

    except ValueError as ve:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=str(ve))
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while processing the report: {str(e)}"
        )

@router.get(
    "/sample",
    response_model=ReportAnalysis,
    summary="Get pre-built educational sample report"
)
async def get_sample_report():
    """
    Returns a sample laboratory report analysis (Complete Blood Count)
    for instant UI demonstration and testing.
    """
    return await AIService.analyze_document(
        extracted_text="Sample CBC Report (Pre-loaded educational demo)",
        filename="sample_cbc_panel.pdf"
    )
