import React from 'react';
import { useState } from 'react';

function Test() {
    const [Content, setContent] = useState("내용 입력");
    const [contentList, setContentList] = useState([]);

    const onSubmit = () => {
        let tempArr = [...contentList];
        tempArr.push(Content);
        setContentList(tempArr);
        setContent("");
    }

    return (
    <div style={{
        display : 'flex',
        flexDirection : 'column',
        alignItems : 'left',
        width : '100%'
    }}>
        {contentList.map((content, idx) => {
            return <div key = {idx} style={{
                width : '100%',
                marginLeft : '1rem'
            }}>내용 : {content}<hr/></div>
        })}
        
        <input type = 'text' style={{width : '500px', marginLeft : '700px', marginTop : '50px'}} value={Content} onChange={(event) => {
            setContent(event.currentTarget.value);
        }} onClick={() => {
            setContent("");
        }}></input>
        <button style={{
            marginTop : "1rem",
            width : "500px",
            marginLeft : '700px'
        }} onClick={() => onSubmit()}>내용 작성</button>

        
    </div>
    );
}

export default Test;