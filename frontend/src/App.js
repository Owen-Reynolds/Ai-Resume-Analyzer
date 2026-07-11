import ResumeUpload from "./ResumeUpload"
import TitleContent from "./TItleContent"

export default function App() {
  return (
    <main className="relative min-h-screen font-sans flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-theme-bg via-theme-bg to-theme-primary selection:bg-theme-secondary selection:text-white">
      {/* Animated Background Blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-theme-primary rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-theme-secondary rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-theme-accent rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-4000"></div>
      
      {/* Content Container */}
      <div className="relative z-10 w-full max-w-5xl px-4 py-12 flex flex-col items-center gap-8">
        <TitleContent />
        <ResumeUpload />
      </div>
    </main>
  )
}