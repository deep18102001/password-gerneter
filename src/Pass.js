import React, { useCallback, useEffect, useRef, useState } from 'react'


function Pass() {
    let [length, setLength] = useState(8)
    let [numberallowed, setNumberallowed] = useState(false)
    let [charallowd, setCharallowd] = useState(false)
    let [password, setPassword] = useState("")

    let passwordRef = useRef(null)

    const passwordGenerater = useCallback(() => {
        let pass = ""
        let str = "asdfghjkasdfghjwertyuzx"
        if (charallowd) str += '!@#$%%^^&&*()_+)((*&[[[!@#$%%^^&&*()_+)((*&[[['
        if (numberallowed) str += "0123456789"

        for (let i = 0; i <= length; i++) {
            let char = Math.floor(Math.random() * str.length + 1)
            pass += str.charAt(char)

        }
        setPassword(pass)
    }, [length, numberallowed, charallowd, setPassword])

    useEffect(() => {
        passwordGenerater()
    }, [length, numberallowed, charallowd, passwordGenerater])

    let copypassword = useCallback(()=>{
        passwordRef.current?.select()
        passwordRef.current?.setSelectionRange(0,5)
        window.navigator.clipboard.writeText(password)
    },[password])


    return (
        <div className='char'>
            <h1>password Generater</h1>
            <div className="h1" >
                <input type='text' value={password} placeholder='password' readOnly ref={passwordRef} />
                <button onClick={ copypassword }>copy</button>
            </div>
            <div>
                <input type='range' min={4} max={10} value={length} onChange={(e) => { setLength(e.target.value) }} />
                <label>length: {length} </label>

                <div>
                    <input type='checkbox' defaultChecked={numberallowed} id='numberinput' onChange={() => { setNumberallowed((prev) => (!prev)) }} />
                    <label id='numberinput'>number</label>

                </div>
                <div>
                    <input type='checkbox' defaultChecked={charallowd} id='charinput' onChange={() => { setCharallowd((prev) => (!prev)) }} />
                    <label id='charinput'>char</label>

                </div>
            </div>

        </div>
    )

}

export default Pass