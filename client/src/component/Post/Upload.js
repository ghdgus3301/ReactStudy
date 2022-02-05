
import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import {UploadButtonDiv, UploadDiv, UploadForm} from "../../Style/UploadCSS.js";
import axios from "axios";
import ImageUpload from "./ImageUpload.js";
import {useSelector} from "react-redux";


function Upload(props) {
    const [Title, setTitle] = useState("제목 입력");
    const [Content, setContent] = useState("내용 입력");
    const [Image, setImage] = useState("");
    let navigate = useNavigate();
    const user = useSelector((state) => state.user);
    
    useEffect(() => {
      if(!user.accessToken){
        alert("로그인한 회원만 접근 가능한 페이지입니다.");
        navigate("/login");
      }
    },[])

    const onSubmit = (e) => {
        e.preventDefault();
        if((Title === "" || Content === "") || (Title === "제목 입력" || Content === "내용 입력")){
          return alert("모든 항목을 채워주세요");
        }

        let body = {
          title : Title,
          content : Content,
          image : Image,
          uid : user.uid,
        }

        axios.post("/api/post/submit", body).then((response) => {
          if(response.data.success){
            alert("글 작성이 완료되었습니다.");
            navigate("/");
             
          } else{
            alert("글 작성에 실패하였습니다.");
          }
        }).catch((err) => {
          console.log(err);
        })
    };

  return( 
  <UploadDiv>
    <UploadForm>
    <label htmlFor="">제목</label>
    <input id = 'title' type = 'text' value={Title} onChange={(event) => {
      setTitle(event.currentTarget.value);
      }} onClick={() => {
          if(Title === "제목 입력" || "")
            setTitle("");
      }}></input>
      <ImageUpload setImage={setImage}></ImageUpload>
      <label htmlFor="content">내용</label>
      <textarea
      value={Content} onChange={(event) => {
        setContent(event.currentTarget.value);
        }} onClick={() => {
          if(Content === "내용 입력" || "")
              setContent("");
      }}></textarea>

    <UploadButtonDiv><button onClick={(e) => onSubmit(e)}>제출</button></UploadButtonDiv>

    </UploadForm> 
    

</UploadDiv>);


}

export default Upload;
