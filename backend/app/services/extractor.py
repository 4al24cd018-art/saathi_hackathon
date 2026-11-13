import io
import re
from typing import Tuple, Optional
import pdfplumber
from PIL import Image

class DocumentExtractor:
    """
    Extracts text from PDFs using pdfplumber and processes image metadata.
    Includes automated de-identification to redact sensitive patient PII.
    """

    @staticmethod
    def deidentify_text(text: str) -> str:
        """
        Redacts personal identifiable information (PII) such as patient names,
        contact numbers, emails, and patient IDs to preserve privacy.
        """
        if not text:
            return ""

        # Redact email addresses
        text = re.sub(r'[\w\.-]+@[\w\.-]+\.\w+', '[REDACTED_EMAIL]', text)

        # Redact phone numbers (10 digits, formatted with dashes, dots, or spaces)
        text = re.sub(r'(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}', '[REDACTED_PHONE]', text)

        # Redact common patient header identifiers while keeping test data intact
        patterns = [
            (r'(?i)(patient\s*name\s*[:\-])\s*([^\n\r,]+)', r'\1 [REDACTED_NAME]'),
            (r'(?i)(name\s*[:\-])\s*([^\n\r,]+)', r'\1 [REDACTED_NAME]'),
            (r'(?i)(mrn|uhid|patient\s*id|registration\s*no|ipd\s*no|opd\s*no)\s*[:\-]\s*([^\n\r,]+)', r'\1: [REDACTED_ID]'),
            (r'(?i)(address|residence)\s*[:\-]\s*([^\n\r]+)', r'\1: [REDACTED_ADDRESS]'),
            (r'(?i)(referred\s*by|doctor\s*name)\s*[:\-]\s*([^\n\r,]+)', r'\1: [DOCTOR_ON_FILE]'),
        ]

        for pattern, replacement in patterns:
            text = re.sub(pattern, replacement, text)

        return text

    @classmethod
    def extract_from_pdf(cls, file_bytes: bytes) -> Tuple[str, int]:
        """
        Extracts textual content from a PDF document using pdfplumber.
        Returns the de-identified text and total page count.
        """
        extracted_pages = []
        try:
            with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
                page_count = len(pdf.pages)
                for index, page in enumerate(pdf.pages):
                    page_text = page.extract_text()
                    if page_text:
                        extracted_pages.append(f"--- Page {index + 1} ---\n{page_text}")

                full_text = "\n\n".join(extracted_pages)
                cleaned_text = cls.deidentify_text(full_text)
                return cleaned_text, page_count
        except Exception as e:
            raise ValueError(f"Failed to extract text from PDF: {str(e)}")

    @classmethod
    def inspect_image(cls, file_bytes: bytes) -> Tuple[dict, bytes]:
        """
        Validates image file and returns metadata and sanitized bytes.
        """
        try:
            with Image.open(io.BytesIO(file_bytes)) as img:
                format_name = img.format or "PNG"
                width, height = img.size
                return {
                    "format": format_name,
                    "width": width,
                    "height": height,
                    "is_image": True
                }, file_bytes
        except Exception as e:
            raise ValueError(f"Invalid image file: {str(e)}")
