from typing import Annotated
from fastapi import FastAPI, File, UploadFile, HTTPException, status, Form
# pyrefly: ignore [missing-import]
from fastapi.middleware.cors import CORSMiddleware
# pyrefly: ignore [missing-import]
import pymupdf
import os
# pyrefly: ignore [missing-import]
from dotenv import load_dotenv
# pyrefly: ignore [missing-import]
from openai import OpenAI
import json

load_dotenv(".env.local")

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

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

    system_prompt = """
        You are an expert AI Resume Analyzer and Technical Recruiter. 
        You will be provided with a candidate's resume text and a target job title/description.
        Your goal is to evaluate the resume against the job title.

        You must return a JSON object with the following structure:
        {
        "ats_score": (a number between 0 and 100),
        "missing_keywords": [(a list of strings of missing skills or keywords)],
        "improvements": [(a list of 3-5 strings with actionable advice to improve the resume)]
        }
        """

    user_prompt = f"Target Job Title: {job_title}\n\nResume Text:\n{resume_text}"


    response = client.chat.completions.create(
        model="gpt-4o-mini",
        response_format={ "type": "json_object"},
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ]
    )

    ai_response = response.choices[0].message.content
    
    return {
            "file_name": file.filename,
            "content_type": file.content_type,
            "file_text": resume_text,
            "job_title": job_title,
            "response": json.loads(ai_response)
    }
