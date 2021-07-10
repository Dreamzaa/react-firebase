import React, { useState, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom'
import firebaseConfig from '../config'
import { Icon } from 'semantic-ui-react'

const Register = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userName, setuserName] = useState('');
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName]  = useState('');
    const [userEmail, setuserEmail] = useState('');
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);
    const [userData, setUserData] = useState('');

    useEffect(() => {
        const firestore = firebaseConfig.database().ref('List');
        firestore.on('value',(response)=>{
            const data = response.val();
            let userInfo = [];
            for(let id in data){
                userInfo.push({
                    id:id,
                    FirstName:data[id].FirstName,
                    LastName:data[id].LastName,
                    UserName:data[id].UserName,
                    UserEmail:data[id].UserEmail
                });
            }
            setUserData(userInfo);
        })
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password} = e.target.elements;

        try{
            firebaseConfig.auth().createUserWithEmailAndPassword(email.value, password.value);
            setCurrentUser(true);

        } catch(error) {
            alert(error);
        }
    
    }
 
    const handleuserOnChange = (e) =>{
        setuserName(e.target.value);
        userData.map(data =>{
            if(e.target.value == data.UserName)
            {
                alert("มี UserName   " + data.UserName +"   นี้อยู่ในระบบแล้ว โปรดใช้ชื่ออื่น");
            }
        }); 
    }

    const handlefirstOnChange = (e) =>{
        setfirstName(e.target.value);
    }

    const handlelastOnChange = (e) =>{
        setlastName(e.target.value);
    }

    const handleuserEmailOnChange = (e) =>{
        setuserEmail(e.target.value);
        userData.map(data =>{
            if(e.target.value == data.UserEmail)
            {
                alert("มี Email  " + data.UserEmail +"  นี้อยู่ในระบบแล้ว โปรดใช้ Email อื่น");
            }
        }); 
    }

    const createList = () =>{
        var inputEmail = document.getElementById("email").value;
        var inputPassword = document.getElementById("password").value;
        var inputUsername = document.getElementById("username").value;
        var inputFirstname = document.getElementById("firstname").value;
        var inputLastname = document.getElementById("lastname").value;
        var inputPictureProfile = document.getElementById("file").value;
        if(inputEmail && inputPassword && inputUsername && inputFirstname && inputLastname &&inputPictureProfile != null){
        const listRef = firebaseConfig.database().ref('List');
        const list = {
            UserName:userName,
            FirstName:firstName,
            LastName:lastName,
            UserEmail:userEmail
        }
        listRef.push(list);
        }
    }

    const handleChange = e => {
        if (e.target.files[0]) {
          setImage(e.target.files[0]);
        }
      };

      const handleUpload = () => {
        const uploadTask = firebaseConfig.storage().ref(`images/${image.name}`).put(image);
        uploadTask.on(
          "state_changed",
          snapshot => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
          },
          error => {
            console.log(error);
          },
          () => {
            firebaseConfig.storage()
              .ref("images")
              .child(image.name)
              .getDownloadURL()
              .then(url => {
                setUrl(url);
              });
          }
        );
      };

      console.log("image: ", image);

    if (currentUser) {
        return <Redirect to="/firebasecrud"/>
    }

    const validateMe =() => {
    if(document.getElementById("password").value == "012345" || document.getElementById("password").value == "123456" || document.getElementById("password").value == "456789" || document.getElementById("password").value == "234567" || document.getElementById("password").value == "1234567" || document.getElementById("password").value == "0123456" || document.getElementById("password").value == "3456789" || document.getElementById("password").value == "345678"){
    alert("ห้ามเป็นตัวเลขเรียงกัน");
    }};

    return (
        <>
            <div class="container mt-5">
            <h1>Register</h1>    
            <form onSubmit={handleSubmit}>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email</label>
                <input type="email" name="email" class="form-control" id="email" aria-describedby="emailHelp" onChange={handleuserEmailOnChange} value={userEmail} placeholder={"อีเมล"} required/>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" name="password" class="form-control" id="password" placeholder={"รหัสผ่านอย่างต่ำ 6 ตัวอักษร ต้องไม่เป็นตัวอักษรและตัวเลขเรียงกัน"} minLength="6" title="รหัสผ่านอย่างต่ำ 6 ตัวอักษร ต้องไม่เป็นตัวอักษร" pattern="^([0-9])*$" required onKeyUp={validateMe}/>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Username</label>
                <input type="text" name="username" class="form-control" id="username" onChange={handleuserOnChange} value={userName} placeholder={"ภาษาอังกฤษ/ตัวเลขไม่เกิน 12 ตัวอักษร"} pattern="^[a-zA-Z0-9]+$" maxLength="12" title="ภาษาอังกฤษ/ตัวเลขไม่เกิน 12 ตัวอักษร" required/>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Firstname</label>
                <input type="text" name="firstname" class="form-control" id="firstname" onChange={handlefirstOnChange} value={firstName} placeholder={"ชื่อจริง"} required/>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Lastname</label>
                <input type="text" name="lastname" class="form-control" id="lastname" onChange={handlelastOnChange} value={lastName} placeholder={"นามสกุล"} required/>
            </div>
            <div>
                <label for="file">เลือกรูปภาพโปรไฟล์</label>
                <br/>
                <input type="file" id="file" name="file" onChange={handleChange} accept="image/*" required/>
                <button type="button" class="btn btn-info" onClick={handleUpload}><Icon name="upload"/>Upload</button>
                <br/>
                <br/>
                <progress value={progress} max="100" />
                <br/>
                <br/>
                <img src={url || "http://via.placeholder.com/300"} alt="firebase-image" />
            </div>
            <br/>
            <button type="submit" class="btn btn-success" onClick={createList}><Icon name="signup"/>Register</button>
            <div class="text-end">
            <Link to="/" class="btn btn-dark"><Icon name="backward"/>Back</Link>
            </div>
            <br/>
            </form>
            </div>
        </>
    )
}

export default Register;