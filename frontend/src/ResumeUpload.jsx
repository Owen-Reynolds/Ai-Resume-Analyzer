import { useState } from "react"
import axios from "axios"

export default function ResumeUpload() {
    const [selectedFile, setSelectedFile] = useState(null)
    const [selectedJobTitle, setSelectedJobTitle] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [analysisResult, setAnalysisResult] = useState(null)

    const onFileChange = (event) => {
        setSelectedFile(event.target.files[0])
    }

    const onJobTitleChange = (event) => {
        setSelectedJobTitle(event.target.value)
    }

    const onFileUpload = async () => {
        if (!selectedFile) {
            return
        }
        const formData = new FormData()
        formData.append("file", selectedFile)
        formData.append("job_title", selectedJobTitle)
        try {
            setIsLoading(true)
            const response = await axios.post("http://127.0.0.1:8000/api/upload/resume", formData);
            setAnalysisResult(response.data.response)
        } finally {
            setIsLoading(false)
        }


    }

    return (
        <section className="max-w-3xl mx-auto p-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
                <input 
                    type="text" 
                    value={selectedJobTitle} 
                    onChange={onJobTitleChange} 
                    placeholder="Target Job Title" 
                    className="px-4 py-3 rounded-lg border-2 border-theme-primary/30 focus:border-theme-primary outline-none text-theme-text shadow-sm w-full md:w-64 bg-white" 
                />
                <input 
                    type="file" 
                    onChange={onFileChange} 
                    accept="application/pdf" 
                    className="text-theme-text file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-theme-primary file:text-white hover:file:bg-theme-primary/80" 
                />
                <button 
                    onClick={onFileUpload} 
                    className="bg-theme-accent hover:bg-theme-secondary text-white font-bold py-3 px-8 rounded-lg shadow-md transition-colors"
                >
                    {isLoading ? "Analyzing..." : "Upload & Analyze"} 
                </button>
            </div>
            <div className="">
                {/* If analysisResult is NOT null, render everything inside the parentheses */}
                {analysisResult && (
                    <div className="mt-8 p-6 bg-white rounded-xl shadow-xl border border-gray-100">

                        {/* ATS Score Section */}
                        <div className="mb-6 border-b pb-4">
                            <h2 className="text-xl font-bold text-theme-text">ATS Score</h2>
                            {/* Using your vibrant Orange for the final score */}
                            <p className="text-6xl font-black text-theme-accent mt-2">
                                {analysisResult.ats_score}<span className="text-2xl text-gray-400">/100</span>
                            </p>
                        </div>

                        {/* Missing Keywords Section */}
                        <div className="mb-6">
                            <h3 className="text-lg font-bold text-theme-text mb-3">Missing Keywords</h3>
                            <div className="flex flex-wrap gap-2">
                                {analysisResult.missing_keywords.map((keyword, index) => (
                                    <span key={index} className="px-3 py-1 bg-theme-secondary/20 text-theme-text rounded-full text-sm font-bold border border-theme-secondary/30">
                                        {keyword}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Improvements Section */}
                        <div>
                            <h3 className="text-lg font-bold text-theme-text mb-3">Actionable Improvements</h3>
                            <ul className="space-y-3">
                                {analysisResult.improvements.map((improvement, index) => (
                                    <li key={index} className="flex items-start bg-theme-bg/30 p-3 rounded-lg">
                                        {/* Using your Teal for the checkmarks */}
                                        <span className="text-theme-primary font-bold mr-3">→</span>
                                        <span className="text-theme-text/90 font-medium">{improvement}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                )}
            </div>
        </section>
    )
}