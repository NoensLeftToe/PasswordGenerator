import { useState, useCallback,useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')

   
  const passwordRef = useRef()
  const generatePassword = useCallback(() =>{
     let pass = ""
     let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
     if(numberAllowed) str += '0123456789'
     if(charAllowed) str += '!@^*()_+#$%&~'

     for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random()*str.length + 1)
      pass += str.charAt(char)
      
     }
     setPassword(pass)
  
    },[length, numberAllowed, charAllowed])


    useEffect(()=>{
     generatePassword()
    }, [length, numberAllowed, charAllowed])

    const changePasswordOnClick = () => {
      window.navigator.clipboard.writeText(password);
      passwordRef.current?.select()
    }
  return (
    <div className='w-full mx-auto mx-w-md rounded-lg shadow-md px-4 py-3 my-8 bg-gray-800 text-orange-700'>
    <h1 className='text-white text-center my-3'> Password Generator</h1>
    <div className='flex shadow round-lg overflow-hidden mb-4'>
      <input type='text' 
      value={password}
      className='px-3 py-1 w-full outline-none'
      placeholder='password'
      ref={passwordRef}
      readOnly
      />
    <button
    onClick={changePasswordOnClick}
     className='outline-none bg-blue-700 text-white py-0.5 px-3 shrink-0 rounded'>Copy</button>
    </div>
    <div
    className='flex text-sm gap-x-2'
    >
      <div className='flex items-center gap-x-1'>
        <input
         type="range"
         min={6}
         max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=> setLength(e.target.value)}
          />
          <label htmlFor='length'>Length: {length}</label>
      </div>

      <div className='flex items-center gap-x-1'>
        <input 
        type="checkbox"
        defaultChecked={numberAllowed}
        onChange={()=>{
          setNumberAllowed((prev)=>!prev)
        }}
        name=""
        id="" />
        <label htmlFor="number">Numbers</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input 
        type="checkbox"
        defaultChecked={charAllowed}
        onChange={()=>{
          setCharAllowed((prev)=>!prev)
        }}
        name=""
        id="" />
        <label htmlFor="charInput">Character</label>
      </div>
     
    </div>
    </div> 
  )
}

export default App
