# AI Resume Analyzer 🚀

A modern, full-stack application that leverages the power of Artificial Intelligence to analyze resumes against specific job titles. Built to help job seekers optimize their resumes for Applicant Tracking Systems (ATS) and improve their chances of landing interviews.

## 🌟 Features

*   **PDF Resume Parsing:** Easily upload resumes in PDF format. The system seamlessly extracts text for analysis.
*   **Targeted Analysis:** Input a specific job title to get tailored feedback.
*   **AI-Powered Insights (OpenAI):** Utilizes OpenAI's GPT-4o-mini model to act as an expert Technical Recruiter, providing deep analysis.
*   **ATS Match Score:** Get a clear 0-100 score indicating how well your resume matches the target role.
*   **Missing Keywords Detection:** Identifies critical skills and keywords missing from your resume compared to industry standards for the role.
*   **Actionable Advice:** Provides 3-5 concrete, actionable improvements you can make to your resume immediately.
*   **Stunning UI/UX:** Features a beautiful, responsive frontend with a beach-themed color palette, glassmorphism effects, and smooth animations built with React and Tailwind CSS.

## 🛠️ Tech Stack

### Frontend
*   **Framework:** React (Create React App)
*   **Styling:** Tailwind CSS
*   **HTTP Client:** Axios
*   **Key UI/UX:** Custom animations, responsive design, glassmorphic elements.

### Backend
*   **Framework:** FastAPI (Python)
*   **PDF Processing:** PyMuPDF (`pymupdf`)
*   **AI Integration:** OpenAI API (`openai` Python client)
*   **Server:** Uvicorn

## 💡 How It Works
1.  The user uploads a PDF resume and enters a target job title on the React frontend.
2.  The frontend sends a `multipart/form-data` POST request to the FastAPI backend.
3.  The backend uses PyMuPDF to extract all text from the uploaded PDF.
4.  The backend crafts a specialized prompt containing the extracted text and the job title, instructing the OpenAI model to act as a technical recruiter and output a specific JSON structure.
5.  The OpenAI API returns the ATS score, missing keywords, and improvements.
6.  The backend sends this JSON response back to the frontend.
7.  The frontend dynamically renders the results using a visually appealing dashboard.

## 🚀 Visit The Site

[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=for-the-badge&logo=vercel)](https://ai-resume-analyzer-three-theta-47.vercel.app/)

[**✨ Click here to try out the live AI Resume Analyzer! ✨**](https://ai-resume-analyzer-three-theta-47.vercel.app/)

## 📝 License
This project is open-source and available for educational and personal use.
