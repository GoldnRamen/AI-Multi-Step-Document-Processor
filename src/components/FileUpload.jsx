import { useEffect, useRef, useState } from "react"
import { Upload, File, XIcon, CheckCircle } from "lucide-react"
import { toast } from "sonner"

export default function FileUpload(){
    const [selectedFile, setSelectedFile] = useState(null)
    const [fileList, setFileList] = useState([])
    const [progress, setProgress] = useState(0)
    const [uploadStatus, setUploadStatus] = useState(null)
    const [showFileUpload, setShowFileUpload] = useState(true)
    const inputRef = useRef(null)

    const handleFile = (event) =>{
        if (event.target.files && event.target.files.length > 0){
            setSelectedFile(event.target.files[0])            
        }        
    }
    useEffect(()=>{
        if (selectedFile != null) return(console.log("I'm no longer null"))
        else if (selectedFile == null) return(console.log("I'm still null"))        
    },[selectedFile])

    const onChooseFile = ()=>{
        if (inputRef.current) {
            inputRef.current.click();
        }
    }

    const clearFileInput = ()=>{
        if (inputRef.current){
            inputRef.current.value == ""
        }
        setSelectedFile(null)
        setProgress(0)
        setUploadStatus("select")
        setShowFileUpload(false)

    }

    const handleUpload = ()=>{        
        if (selectedFile != null){                                                
            fileList.push({
                id:crypto.randomUUID(),
                name: selectedFile.name,
                size: selectedFile.size,
                status: "completed"
            })                            
            console.log(fileList)                                                
            toast.success("File Upload was successfull") 
            setShowFileUpload(false)
        }
        else{
            toast.error("Pls try upload again")
        }
        setSelectedFile(null)
    }
    return(
        <>
        <div className="mt-20">            
            <div className="flex justify-center flex-col items-center relative">
                <div className="">
                    <p className="text-3xl font-bold flex justify-center my-20">Upload File</p>
                    {!selectedFile && (
                        <div>
                            <input type="file" className="hidden" ref={inputRef} onChange={handleFile} onClick={()=>{setShowFileUpload(true); setSelectedFile(null)}} />
                            <button onClick={onChooseFile} className="flex flex-col justify-center items-center gap-5 border-2 mt-5 border-dashed mx-auto bg-blue-50 w-80 h-32 rounded-2xl" >
                                <Upload className="rounded-full w-10 h-10 p-3 bg-indigo-200 hover:bg-indigo-400"/>
                                <p className="underline cursor-pointer">Upload File</p>
                            </button>            
                        </div>
                    )}
                </div>
                {selectedFile && (
                    <div>
                        {showFileUpload && (
                            <div className="flex-col w-76 h-fit bg-white mt-5 items-center">                    
                                <div className="flex justify-between border rounded-t-lg px-1 py-2 gap-3.5">                  
                                    <File width={'30px'} height={'30px'} className="text-lime-800 hover:bg-indigo-200 rounded-full p-1 cursor-pointer" />      
                                    <div className="flex-1 w-full">
                                        <p className="text-sm text-start">{selectedFile.name}</p>                        
                                        <div className="w-full h-1 bg-indigo-50 rounded">
                                            <div className="w-[40%] h-full bg-indigo-800 rounded prog-transition"></div>
                                        </div>
                                    </div>
                                    <button onClick={clearFileInput}><XIcon className="text-indigo-800 hover:bg-indigo-200 rounded-full p-1 cursor-pointer" width={'30px'} height={'30px'} /></button>
                                </div>
                                <p className="bg-indigo-900 hover:bg-indigo-700 w-full text-white p-2 rounded-b-lg text-xs font-semibold cursor-pointer" onClick={handleUpload}>Upload</p>
                            </div>
                        )}
                    </div>               
                )}                
                <div className="border-t border-t-lime-600 bg-lime-100 mt-10 w-160 fixed top-64 overflow-y-auto ">
                    <div className="flex flex-col h-[40vh] overflow-y-auto mt-3">
                        {fileList && fileList.length > 0 ? (                    
                            [...fileList].reverse().map((someFile)=>(
                                <div key={someFile.id} className="flex justify-between border rounded-lg px-1 py-2 my-1 mx-auto w-120">
                                    <div className="flex w-full justify-between">
                                        <div className="flex gap-2 items-center align-middle">
                                            <File width={'30px'} height={'30px'} className="text-lime-800 hover:bg-indigo-200 rounded-full p-1 cursor-pointer" />      
                                            <p className="text-sm text-start">{someFile.name.length > 20 ? someFile.name.slice(0, 20) + "..." : someFile.name }</p>                                                
                                        </div>
                                        <div className="flex gap-2 items-center align-middle">
                                            <p className="text-xs text-start">{(someFile.size / (1024 * 1024)).toFixed(2)}MB</p>                                                
                                            <CheckCircle width={'20px'} height={'20px'} className="text-green-800" />
                                            <button><XIcon className="text-indigo-800 hover:bg-indigo-200 rounded-full p-1 cursor-pointer" width={'30px'} height={'30px'} /></button>
                                        </div>
                                    </div>
                                </div>
                            ))               
                        ) : <>Not available</>}
                    </div>
                </div>
                
            </div>
        </div>
        </>
    )
}