import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from './Auth'
import { Icon } from 'semantic-ui-react'

const Home = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <>
            <div class ="text-center mt-5 text-capitalize fs-5">
                <div class="badge bg-danger text-wrap fs-1 "><h1>Welcome to</h1>
                <h1>Authentication Firebase</h1></div>
                {currentUser ? (
                    <p>You are logged in - <Link to="/firebasecrud">View Database</Link></p>
                    ) : (
                        <p>
                            <br/>
                            <Link to="/login" class="btn btn-primary btn-lg mx-auto"><Icon name="sign-in"/>Log In</Link>
                            <br/>    
                            <br/>
                            <Link to="/register" class="btn btn-success btn-lg mx-auto"><Icon name="signup"/> Register</Link>
                        </p>
                )}
            </div>
        </>
    )
}

export default Home;