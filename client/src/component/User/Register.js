import React, { useState, useEffect } from 'react';
import LoginDiv from '../../Style/UserCSS';
import firebase from '../../firebase.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useSelector} from "react-redux";


function Register() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [PW, setPW] = useState("");
  const [PWConfirm, setPWConfirm] = useState("");
  const [Flag, setFlag] = useState(false);
  const [NameCheck, setNameCheck] = useState(false);
  const [NameInfo, setNameInfo] = useState("");
  const user = useSelector((state) => state.user);
  let navigate = useNavigate();

  useEffect(() => {
    if(user.accessToken){
        navigate("/");
      }
  },[])

  const RegisterFunc = async (e) => { //async , await (비동기함수 : 코드가 실행될때까지 기다림)
    setFlag(true);
    e.preventDefault();
    if(!(Name && Email && PW && PWConfirm)){
        return alert("모든 값을 입력하세요.");
    }
    if(PW != PWConfirm){
        return alert("비밀번호와 비밀번호 확인 값이 같지 않습니다.");
    }
    if(!NameCheck){
        return alert("닉네임 중복검사를 진행해주세요.")
    }
    let createdUser = await firebase
    .auth()
    .createUserWithEmailAndPassword(Email, PW);

    await createdUser.user.updateProfile({
        displayName : Name,
    });

    console.log(createdUser.user);
    let body = {
        email : createdUser.user.multiFactor.user.email,
        displayName : createdUser.user.multiFactor.user.displayName,
        uid : createdUser.user.multiFactor.user.uid,

    };
    axios.post("/api/user/register", body).then((response) => {
        setFlag(false);
        if(response.data.success){
            //회원가입 성공시
            navigate("/login");
        }else{
            //회원가입 실패시
            return alert("회원가입이 실패하였습니다");
        }
    })
  }

  const NameCheckFunc = async (e) => {
    e.preventDefault();
    if(!Name){
        return alert("닉네임을 입력해주세요.");
    }
    let body = {
        displayName : Name,
    }
    await axios.post("/api/user/namecheck", body).then((response) => {
        if(response.data.success){
            if(response.data.check){
                setNameCheck(true);
                setNameInfo("사용 가능한 닉네임입니다.");
            }else{
            setNameInfo("사용 불가능한 닉네임입니다.")}
        }
    });
  }
  

  return(
    <LoginDiv>
        <form>
        <label>닉네임</label>
        <input type = "name" value={Name} onChange = {(e) => setName(e.currentTarget.value)} disabled = {NameCheck}></input>
        {NameInfo}
        <button onClick={(e) => NameCheckFunc(e)}>닉네임 중복검사</button>
        <label>이메일</label>
        <input type = "email" value={Email} onChange = {(e) => setEmail(e.currentTarget.value)}></input>
        <label>비밀번호</label>
        <input type = "password" minLength={8} value={PW} onChange = {(e) => setPW(e.currentTarget.value)}></input>
        <label>비밀번호 확인</label>
        <input type = "password" minLength={8} value={PWConfirm} onChange = {(e) => setPWConfirm(e.currentTarget.value)}></input>
        <button disabled={Flag} onClick={(e) => RegisterFunc(e)}>회원가입</button>
        </form>
    </LoginDiv>
  ); 
}

export default Register;
