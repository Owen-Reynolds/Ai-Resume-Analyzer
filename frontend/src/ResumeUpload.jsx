import { useState } from "react"
import axios from "axios"

export default function ResumeUpload() {
    const [selectedFile, setSelectedFile] = useState(null)
    const [selectedJobTitle, setSelectedJobTitle] = useState(null)

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
        const response = await axios.post("http://127.0.0.1:8000/api/upload/resume", formData);
        console.log(response.data)
    }

    return (
        <div className="">
            <input type="text" value={selectedJobTitle} onChange={onJobTitleChange} placeholder="Job Title" />
            <input type="file" onChange={onFileChange} accept="application/pdf" />
            <button onClick={onFileUpload}>Upload</button>
        </div>
    )
}