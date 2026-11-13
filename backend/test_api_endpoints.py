import sys
import os
import io

sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health():
    response = client.get("/health")
    assert response.status_code == 200, f"Health check failed: {response.text}"
    data = response.json()
    assert data["status"] == "healthy"
    assert data["mock_mode"] is True
    print("  -> /health endpoint PASSED:", data)

def test_sample():
    response = client.get("/api/sample")
    assert response.status_code == 200, f"Sample endpoint failed: {response.text}"
    data = response.json()
    assert "report_title" in data
    assert len(data["categories"]) >= 3
    assert len(data["questions_for_doctor"]) >= 3
    assert "EDUCATIONAL" in data["educational_disclaimer"].upper()
    print("  -> /api/sample endpoint PASSED (Report:", data["report_title"], ")")

def test_analyze_file_upload():
    # Simulate a lab report file upload (e.g. text/pdf or dummy image)
    file_content = b"Simulated Lab Report Data: Hemoglobin 11.4 g/dL, WBC 6800 /mcL"
    files = {"file": ("test_report.pdf", io.BytesIO(file_content), "application/pdf")}
    
    # Even if raw text isn't a valid PDF structure, our error handling or extraction should handle it cleanly
    # Let's test with a valid PNG image byte sequence
    from PIL import Image
    img_byte_arr = io.BytesIO()
    img = Image.new('RGB', (200, 200), color=(255, 255, 255))
    img.save(img_byte_arr, format='PNG')
    img_byte_arr.seek(0)
    
    img_files = {"file": ("sample_lab_photo.png", img_byte_arr, "image/png")}
    response = client.post("/api/analyze", files=img_files)
    assert response.status_code == 200, f"Analyze endpoint failed: {response.text}"
    data = response.json()
    assert data["is_mock"] is True
    assert data["filename"] == "sample_lab_photo.png"
    print("  -> /api/analyze image upload PASSED (Filename:", data["filename"], ")")

if __name__ == "__main__":
    print("Running FastAPI Endpoint Verification...")
    test_health()
    test_sample()
    test_analyze_file_upload()
    print("All API endpoints verified successfully!")
