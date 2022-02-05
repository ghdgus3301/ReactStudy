import React, { useState } from 'react';
import LoginDiv from '../../Style/UserCSS';
import firebase from '../../firebase.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Register() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [PW, setPW] = useState("");
  const [PWConfirm, setPWConfirm] = useState("");
  const [Flag, setFlag] = useState(false);
  let navigate = useNavigate();

  const RegisterFunc = async (e) => { //async , await (비동기함수 : 코드가 실행될때까지 기다림)
    setFlag(true);
    e.preventDefault();
    if(!(Name && Email && PW && PWConfirm)){
        return alert("모든 값을 입력하세요.");
    }
    if(PW != PWConfirm){
        return alert("비밀번호와 비밀번호 확인 값이 같지 않습니다.");
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

  return(
    <LoginDiv>
        <form>
        <label>이름</label>
        <input type = "name" value={Name} onChange = {(e) => setName(e.currentTarget.value)}></input>
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
