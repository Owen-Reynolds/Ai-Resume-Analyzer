from fastapi import FastAPI, File, UploadFile, HTTPException, status
import pymupdf
app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello World"}

@app.post("/api/upload/resume")
async def create_upload_file(file: UploadFile):

    if file.content_type != "application/pdf":
        raise HTTPException(status.HTTP_400_BAD_REQUEST, detail="Invalid File Format")

    pdfRead = pymupdf.open(stream=await file.read(), filetype="pdf")
    resume_text=""
    for page in pdfRead:
        resume_text += page.get_text()

    return {
                "file_name": file.filename,
                "content_type": file.content_type,
                "file_text": resume_text
            }
