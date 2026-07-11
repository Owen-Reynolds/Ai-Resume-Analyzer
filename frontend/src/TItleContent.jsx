export default function TitleContent() {
    return (
        <section className="py-12 px-4 text-center">
            {/* Dark blue text, dropping a subtle shadow to make it pop */}
            <h1 className="text-4xl font-extrabold mb-4 text-theme-text drop-shadow-sm">
                AI Resume Analyzer
            </h1>
            <p className="max-w-2xl mx-auto mb-8 text-theme-text/80 font-medium">
                Upload your resume and get an instant ATS score using our advanced AI.
            </p>
        </section>
    )
}