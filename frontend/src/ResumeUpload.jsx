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
        <section className="w-full max-w-4xl mx-auto p-4 sm:p-8 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            {/* Glassmorphic Upload Card */}
            <div className="bg-white/30 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] mb-8 flex flex-col items-center justify-center gap-6 transition-all duration-300 hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.2)]">

                <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4">
                    <input
                        type="text"
                        value={selectedJobTitle}
                        onChange={onJobTitleChange}
                        placeholder="e.g. Frontend Engineer"
                        className="px-5 py-4 rounded-xl border-2 border-white/50 focus:border-theme-primary outline-none text-theme-text shadow-inner w-full md:w-72 bg-white/60 backdrop-blur-sm transition-all focus:bg-white placeholder-theme-text/50 font-medium text-lg"
                    />

                    <div className="w-full md:w-auto flex flex-col items-center">
                        <input
                            type="file"
                            id="resume-upload"
                            onChange={onFileChange}
                            accept="application/pdf"
                            className="hidden"
                        />
                        <label
                            htmlFor="resume-upload"
                            className="w-full md:w-auto flex items-center justify-center gap-2 cursor-pointer bg-gradient-to-r from-theme-primary to-[#1a829c] hover:from-[#1a829c] hover:to-theme-primary text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all transform hover:-translate-y-1 hover:shadow-xl"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                            Select Resume (PDF)
                        </label>
                    </div>
                </div>

                {selectedFile && (
                    <div className="flex items-center gap-2 text-theme-text font-semibold bg-white/50 px-4 py-2 rounded-lg backdrop-blur-sm animate-fadeInUp">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-theme-primary" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                        </svg>
                        {selectedFile.name}
                    </div>
                )}

                <button
                    onClick={onFileUpload}
                    disabled={isLoading || !selectedFile || !selectedJobTitle}
                    className={`w-full md:w-96 font-bold py-4 px-8 rounded-xl shadow-lg transition-all transform flex justify-center items-center gap-2 text-lg
                        ${isLoading || !selectedFile || !selectedJobTitle
                            ? 'bg-gray-400 cursor-not-allowed text-white/80'
                            : 'bg-gradient-to-r from-theme-accent to-[#e67a00] hover:from-[#e67a00] hover:to-theme-accent text-white hover:-translate-y-1 hover:shadow-xl'
                        }`}
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Analyzing Resume...
                        </>
                    ) : "Analyze Resume"}
                </button>
            </div>

            {/* Results Section */}
            {analysisResult && (
                <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/60 p-8 md:p-10 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>

                    <div className="flex flex-col items-center text-center gap-6 mb-10 border-b border-gray-200 pb-8">
                        {/* Score Circle */}
                        <div className="relative flex items-center justify-center w-40 h-40 rounded-full bg-gradient-to-br from-theme-bg to-theme-primary shadow-inner">
                            <div className="absolute w-36 h-36 bg-white rounded-full flex flex-col items-center justify-center shadow-md">
                                <span className="text-5xl font-black text-theme-accent">{analysisResult.ats_score}</span>
                                <span className="text-sm font-bold text-gray-400">/ 100</span>
                            </div>
                        </div>
                        <div className="max-w-xl">
                            <h2 className="text-3xl font-extrabold text-theme-text mb-2">ATS Match Score</h2>
                            <p className="text-theme-text/70 text-lg">
                                {analysisResult.ats_score >= 80 ? "Great job! Your resume is highly optimized for this role." :
                                    analysisResult.ats_score >= 60 ? "Good start, but there's room for improvement to beat the ATS." :
                                        "Needs work. Focus on adding missing keywords and tailoring your experience."}
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-1 gap-8">
                        {/* Missing Keywords Section */}
                        <div className="bg-theme-bg/20 rounded-2xl p-6 border border-theme-bg/30">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="bg-theme-secondary text-white p-2 rounded-lg shadow-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </span>
                                <h3 className="text-xl font-bold text-theme-text">Missing Keywords</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {analysisResult.missing_keywords.length > 0 ? analysisResult.missing_keywords.map((keyword, index) => (
                                    <span key={index} className="px-4 py-2 bg-white text-theme-text rounded-lg text-sm font-bold shadow-sm border border-gray-100 hover:border-theme-secondary transition-colors cursor-default">
                                        {keyword}
                                    </span>
                                )) : (
                                    <p className="text-theme-primary font-medium">Awesome! No missing keywords found.</p>
                                )}
                            </div>
                        </div>

                        {/* Improvements Section */}
                        <div className="bg-theme-bg/10 rounded-2xl p-6 border border-theme-bg/20">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="bg-theme-primary text-white p-2 rounded-lg shadow-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </span>
                                <h3 className="text-xl font-bold text-theme-text">Actionable Advice</h3>
                            </div>
                            <ul className="space-y-4">
                                {analysisResult.improvements.map((improvement, index) => (
                                    <li key={index} className="flex items-start bg-white p-4 rounded-xl shadow-sm border border-gray-50">
                                        <span className="text-theme-accent font-black mr-3 text-lg mt-1">•</span>
                                        <span className="text-theme-text/90 font-medium leading-relaxed">{improvement}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>
            )}
        </section>
    )
}