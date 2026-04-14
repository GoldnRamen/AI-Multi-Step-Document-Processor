import { useState } from "react";

export default function Header() {
  const [dragActive, setDragActive] = useState(false);
return(
    <>      
      <header className="w-full border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          
          {/* Logo / Brand */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-cyan-900 text-white flex items-center justify-center rounded-xl font-bold">
              U
            </div>
            <h1 className="text-lg font-semibold text-gray-800">
              UploadHub
            </h1>
          </div>

          {/* Upload Button */}
          {/* <label
            onDragEnter={() => setDragActive(true)}
            onDragLeave={() => setDragActive(false)}
            className={`relative cursor-pointer px-4 py-2 rounded-lg text-sm font-medium transition
              ${
                dragActive
                  ? "bg-cyan-900 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
          >
            Upload File
            <input
              type="file"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;
                console.log("Selected file:", file);
              }}
            />
          </label> */}
        </div>
      </header>
    </>
)
    
}