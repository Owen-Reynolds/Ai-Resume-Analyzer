# pyrefly: ignore [missing-import]
from typing import Annotated
from fastapi import FastAPI, File, UploadFile, HTTPException, status, Form
# pyrefly: ignore [missing-import]
from fastapi.middleware.cors import CORSMiddleware
# pyrefly: ignore [missing-import]
import pymupdf

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
def read_root():
    return {"message": "Hello World"}

@app.post("/api/upload/resume")
async def create_upload_file(file: UploadFile, job_title: str = Form()):

    if file.content_type != "application/pdf":
        raise HTTPException(status.HTTP_400_BAD_REQUEST, detail="Invalid File Format")

    pdfRead = pymupdf.open(stream=await file.read(), filetype="pdf")
    resume_text=""
    for page in pdfRead:
        resume_text += page.get_text()

    return {
                "file_name": file.filename,
                "content_type": file.content_type,
                "file_text": resume_text,
                "job_title": job_title
            }
