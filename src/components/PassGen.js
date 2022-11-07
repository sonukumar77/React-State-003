import { useState, useEffect, useRef } from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { MdOutlineFileCopy } from "react-icons/md"

const PassGen = () => {


    const [output, setOutput] = useState("");
    const [passwordLength, setPasswordLength] = useState(6);
    const [isCopied, setCopied] = useState(false);

    useEffect(() => {
        if (isCopied) {
            setTimeout(() => {
                setCopied(false);
            }, 3000)
        }
    }, [isCopied])
    const upperCaseCheckboxRef = useRef();
    const lowerCaseCheckboxRef = useRef();
    const numbersCheckboxRef = useRef();
    const symbolsCheckboxRef = useRef();

    const changeSelect = (e) => {

        setPasswordLength(e.target.value);
    }

    const generatePass = () => {

        const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lowerCase = "abcdefghijklmnopqrstuvwxyz";
        const numbers = "0123456789";
        const symbols = "!@#$%^&*()_+";

        let finalString = "";

        if (upperCaseCheckboxRef.current.checked === false && lowerCaseCheckboxRef.current.checked === false && numbersCheckboxRef.current.checked === false && symbolsCheckboxRef.current.checked === false) {
            finalString = upperCase + lowerCase + numbers + symbols;
        }
        if (upperCaseCheckboxRef.current.checked === true) {
            finalString = finalString + upperCase;
        }

        if (lowerCaseCheckboxRef.current.checked === true) {
            finalString = finalString + lowerCase;
        }
        if (numbersCheckboxRef.current.checked === true) {
            finalString = finalString + numbers;
        }
        if (symbolsCheckboxRef.current.checked === true) {
            finalString = finalString + symbols;
        }

        let passLength = passwordLength;

        let outputPass = "";
        for (let i = 0; i < passLength; i++) {
            let randomIndex = Math.floor(Math.random() * finalString.length + 1);
            let singalChar = finalString.charAt(randomIndex);
            outputPass = outputPass + singalChar;

        }


        setOutput(outputPass);
        // console.log(upperCaseCheckboxRef.current.checked,finalString);
    }
    return (
        <>
            <div className="mainBox">
                <div className="row">
                    <h1>Password Generator </h1>
                    <div className="outputDiv">
                        <input type="text" disabled value={output} />
                        <CopyToClipboard text={output}
                            onCopy={() => setCopied(true)}>
                            <MdOutlineFileCopy className="copyIcon" />
                        </CopyToClipboard>

                    </div>
                    <span className="copyText">{isCopied ? `Copied!` : ""}</span>
                </div>
                <div className="row inline">
                    <p>Select Password Length</p>
                    <select onChange={changeSelect} defaultValue="6">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>

                    </select>
                </div>
                <div className="checkboxContainer">
                    <div className="row checkboxRow">
                        <input type="checkbox" ref={upperCaseCheckboxRef} id="upperCaseCheckbox" />
                        <label htmlFor="upperCaseCheckbox">include uppercase latters</label>
                    </div>
                    <div className="row">
                        <input type="checkbox" ref={lowerCaseCheckboxRef} id="lowerCaseCheckbox" />
                        <label htmlFor="lowerCaseCheckbox">include lowercase latters</label>
                    </div>
                    <div className="row">
                        <input type="checkbox" ref={numbersCheckboxRef} id="numberCheckbox" />
                        <label htmlFor="numberCheckbox">include numbers</label>
                    </div>
                    <div className="row">
                        <input type="checkbox" ref={symbolsCheckboxRef} id="symbolCheckbox" />
                        <label htmlFor="symbolCheckbox">include symbols</label>
                    </div>

                </div>
                <div className="row">
                    <button id="btn" onClick={generatePass}>Generate Password</button>
                </div>

            </div>
        </>
    )
}

export default PassGen;