export default function TitleContent() {
    return (
        <section className="px-4 text-center animate-fadeInUp">
            {/* Gradient text for a sunset vibe */}
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-theme-text via-theme-text to-theme-accent drop-shadow-sm">
                AI Resume Analyzer
            </h1>
            <p className="max-w-2xl mx-auto text-theme-text/80 text-lg md:text-xl font-medium leading-relaxed">
                Ride the wave to your next job. Upload your resume and get an instant <span className="font-bold text-theme-primary">ATS score</span> using our advanced AI.
            </p>
        </section>
    )
}