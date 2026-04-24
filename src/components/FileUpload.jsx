import { useEffect, useRef, useState } from "react"
import { Upload, File, XIcon, CheckCircle } from "lucide-react"
import { toast } from "sonner"

export default function FileUpload(){
    const [selectedFile, setSelectedFile] = useState(null)
    const [fileList, setFileList] = useState(()=>{
        const fileHistory = localStorage.getItem("fileData")
        return fileHistory ? JSON.parse(fileHistory) : []
    })
    const [progress, setProgress] = useState(0)
    const [uploadStatus, setUploadStatus] = useState(null)
    const [showFileUpload, setShowFileUpload] = useState(true)    
    const inputRef = useRef(null)    
    const timeoutRef = useRef(null)    
    const [isHovering, setIsHovering] = useState(null)
    const [currentExtracted, setCurrentExtracted] = useState(()=>{
        const fileExtracted = localStorage.getItem("currentFile")
        if(fileExtracted){
            const parsedFile = JSON.parse(fileExtracted)
            return parsedFile?.contentForExtraction || ""
        }
        return ""

    })
    

    const handleFile = (event) =>{
        if (event.target.files && event.target.files.length > 0){
            setSelectedFile(event.target.files[0])                        
        }        
    }  
    
    // console.log("From localSTorage,: ", currentFile)

    useEffect(()=>{
        if (selectedFile != null) {
            console.log("I'm no longer null, I am the selected File: ", selectedFile)
        }

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

    const handleUpload = async()=>{    
        // I used an async await here            
        if (selectedFile != null){         
            const text = await selectedFile.text()                                       
            const latestFile = {
                id:crypto.randomUUID(),
                name: selectedFile.name,
                size: selectedFile.size,
                status: "completed",
                contentForExtraction: text
            }    
            const updatedList = [latestFile, ...fileList]
            localStorage.setItem("fileData", JSON.stringify(updatedList))       
            localStorage.setItem("currentFile", JSON.stringify(latestFile))               
            setFileList(updatedList)
            console.log(updatedList)                                                
            console.log("LocalData :", updatedList)            
            toast.success("File Upload was successfull") 
            setShowFileUpload(false)
        }
        else{
            toast.error("Pls try upload again")
        }
        setSelectedFile(null)
    }

    const handleDelete = (someFileId) => {
        const fileArray = JSON.parse(localStorage.getItem("fileData"))
        if (fileArray) {
            const updatedArray = fileArray.filter(file => file.id !== someFileId)
            localStorage.removeItem("fileData")
            localStorage.setItem("fileData", JSON.stringify(updatedArray))
            setFileList(updatedArray)
        }
    }

    const handleMouseEnter = ()=>{
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
            setIsHovering(true)
    }
    const handleMouseLeave = ()=>{
        timeoutRef.current = setTimeout(()=>{
            setIsHovering(false)
        }, 300)
    }

    const handleFileExtraction = (currentExtracted)=>{
        const reader = new FileReader()
        reader.onload = (e) =>{
            const text = e.target.result
            console.log('Extracted content: ', text)            
        }        
        console.log('Type of file:', currentExtracted instanceof Blob) 
        reader.readAsText(currentExtracted)
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
                            <div className="flex-col w-fit h-fit bg-white mt-5 items-center">                    
                                <div className="flex justify-between border rounded-t-lg px-1 py-2 gap-3.5">                  
                                    <File width={'30px'} height={'30px'} className="text-lime-800 hover:bg-indigo-200 rounded-full p-1 cursor-pointer" />      
                                    <div className="flex-1 w-full">
                                        <p className="text-xs text-start ">{selectedFile.name}</p>                        
                                        <div className="w-full h-1 bg-indigo-50 rounded mt-1">
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
                <div className="border-t border-t-lime-600 bg-lime-100 mt-10 w-160 fixed top-64">
                    <div className="flex flex-col h-[40vh] overflow-y-auto scrollbar-thin scrollbar-thumb-green-900 scrollbar-track-transparent mt-3">
                        {fileList && fileList.length > 0 ? (                    
                            fileList.reverse().map((someFile)=>(
                                <div key={someFile.id} className="flex justify-between border rounded-lg px-1 py-2 my-1 mx-auto w-120 relative">
                                    <div className="flex w-full justify-between">
                                        <div className="flex gap-2 items-center align-middle">
                                            <File width={'30px'} height={'30px'} className="text-lime-800 hover:bg-indigo-200 rounded-full p-1 cursor-pointer" />      
                                            <div className="relative group" onMouseEnter={() => setIsHovering(someFile.id)} onMouseLeave={() => setIsHovering(null)}>
                                                <p className="text-sm text-start">
                                                    {someFile.name.length > 20 ? someFile.name.slice(0, 20) + "..." : someFile.name}
                                                </p>                                                
                                                {isHovering === someFile.id && (
                                                    <p className="absolute z-10 p-1 text-xs bg-white border shadow-md rounded -bottom-8 left-0 whitespace-nowrap">
                                                    {someFile.name}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex gap-2 items-center align-middle">
                                            <p className="text-xs text-start">{(someFile.size / (1024 * 1024)).toFixed(2)}MB</p>                                                
                                            <CheckCircle width={'20px'} height={'20px'} className="text-green-800" />
                                            <button onClick={()=>handleDelete(someFile.id)}><XIcon className="text-indigo-800 hover:bg-indigo-200 rounded-full p-1 cursor-pointer" width={'30px'} height={'30px'} /></button>
                                        </div>
                                    </div>
                                </div>
                            ))               
                        ) : <>Uploads Appear Here</>}
                    </div>
                </div>

                <div className="border p-2 " onClick={handleFileExtraction}>Extract latest file</div>
                
            </div>
        </div>
        </>
    )
}