import React, { useContext } from 'react'
import { Redirect, Link} from 'react-router-dom'
import { AuthContext } from './Auth'
import firebaseConfig from '../config'
import { Icon, Container, Segment} from 'semantic-ui-react'

const LogIn = () => {

    const handleSubmit = (e) =>{
        e.preventDefault();

        const { email, password } = e.target.elements;

        try{

            firebaseConfig.auth().signInWithEmailAndPassword(email.value, password.value);
        }catch(error){
            alert(error);
        }
    }

    const { currentUser } = useContext(AuthContext);
    if(currentUser) {
        return <Redirect to="/firebasecrud" />;
    }

return (
    <>
        <Container>
            <Segment padded="very">
        <div class="container mt-5">
        <h1>Log In</h1>    
            <form onSubmit={handleSubmit}>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email</label>
                <input type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="อีเมล"required/>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" name="password" class="form-control" id="exampleInputPassword1" pattern ="[0-9]*" placeholder="รหัสผ่าน" required/>
            </div>
            <button type="submit" class="btn btn-primary"><Icon name="sign in"/>Log In</button>
            <div class="text-end">
            <Link to="/" class="btn btn-dark"><Icon name="backward"/>Back</Link>
            </div>
            </form>
        </div>
        </Segment>
        </Container>
    </>
)
}

export default LogIn;