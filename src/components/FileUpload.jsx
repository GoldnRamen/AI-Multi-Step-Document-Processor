import { useRef, useState } from "react"
import { Upload, File, XIcon } from "lucide-react"

export default function FileUpload(){
    const [selectedFile, setSelectedFile] = useState(null)
    const [progress, setProgress] = useState(0)
    const [uploadStatus, setUploadStatus] = useState("select")
    const inputRef = useRef(null)

    const handleFile = (event) =>{
        if (event.target.files && event.target.files.length > 0){
            setSelectedFile(event.target.files[0])
        }
    }

    const onChooseFile = ()=>{
        inputRef.current.click()
    }

    const clearFileInput = ()=>{
        inputRef.current.value = ""
        setSelectedFile(null)
        setProgress(0)
        setUploadStatus("select")
    }
    return(
        <>
        <p className="text-3xl font-bold flex justify-center">Upload File</p>
        <div className="flex justify-center ">
            <input type="file" className="hidden" ref={inputRef} onChange={handleFile} />
            {!selectedFile && (
                <button onClick={onChooseFile} className="flex flex-col justify-center items-center gap-5 border-2 mt-5 border-dashed mx-auto bg-blue-50 w-80 h-32 rounded-2xl" >
                 <Upload className="rounded-full w-10 h-10 p-3 bg-indigo-200 hover:bg-indigo-400"/>
                 <p>Upload File</p>
                </button>
            )}
            {selectedFile && (
                <div className="flex-col w-76 h-fit bg-white mt-5 items-center">                    
                    <div className="flex justify-between border rounded-t-lg px-1 py-2 gap-3.5">                  
                        <File width={'30px'} height={'30px'} className="text-indigo-800 hover:bg-indigo-200 rounded-full p-1 cursor-pointer" />      
                        <div className="flex-1 w-full">
                            <p className="text-sm text-start">{selectedFile.name}</p>                        
                            <div className="w-full h-1 bg-indigo-50 rounded">
                                <div className="w-[40%] h-full bg-indigo-800 rounded prog-transition"></div>
                            </div>
                        </div>
                        <button onClick={clearFileInput}><XIcon className="text-indigo-800 hover:bg-indigo-200 rounded-full p-1 cursor-pointer" width={'30px'} height={'30px'} /></button>
                    </div>
                    <p className="bg-indigo-900 hover:bg-indigo-700 w-full text-white p-2 rounded-b-lg text-xs font-semibold cursor-pointer">Upload</p>
                </div>
            )}
        </div>
        </>
    )
}