import { useState } from "react";

export default function Header() {
  const [dragActive, setDragActive] = useState(false);
return(
    <>      
      <header className="w-full fixed top-0 z-50 bg-lime-900">
        <div className="mx-auto px-4 py-4 flex items-center justify-between">
          
          {/* Logo / Brand */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-lime-950 text-white flex items-center justify-center rounded-xl font-bold">
              U
            </div>
            <p className="text-4xl font-semibold text-white">
              UploadHub
            </p>
          </div>        
        </div>
      </header>
    </>
)
    
}