import React, { useState } from "react";

function Input(props) {
    const [inputText, setInputText] = useState("");

    function handleInputTextChange(event) {
        setInputText(event.target.value);
    }

    return <input style={props.style} className={props.className} onKeyDown={(event) => {
        if (event.key === 'Enter') {
            if (inputText !== "" && /\S/.test(inputText)) {
                props.addToDoItem(inputText);
            }
            setInputText("");
        }
    }} onChange={handleInputTextChange} type="text" placeholder="Create a new todo..." value={inputText} />
}

export default Input;