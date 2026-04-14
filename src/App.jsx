import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Header from './components/Header'
import FileUpload from './components/FileUpload'

export default function App() {
  const [count, setCount] = useState(2)

  return (
    <>
    <Header />
    <main className='bg-white w-full h-screen text-cyan-950 container flex-1 justify-center'>
      <FileUpload />
    </main>
    </>
  )
}

