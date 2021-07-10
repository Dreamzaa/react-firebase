import { Container , Grid, Form, Segment, Button, Header, Input, Table, Icon} from "semantic-ui-react"
import { useState ,useEffect, useContext} from 'react';
import { Redirect } from 'react-router-dom'
import { AuthContext } from './Auth'
import firebaseConfig from "../config";

export default function FirebaseCrud (){

    const { currentUser } = useContext(AuthContext);
    const [FirstName,setFirstName] = useState('');
    const [LastName,setLastname] = useState('');
    const [UserName,setUserName] = useState('');
    const [UserEmail,setUserEmail] = useState('');
    const [userData,setUserData] = useState([]);
    const [aFirstName,setaFirstName] = useState('');
    const [aLastName,setaLastName] = useState('');
    const [aUserName,setaUserName] = useState('');
    const [aUserEmail,setaUserEmail] = useState('');
    const [userId,setUserId] = useState('');
    const [resetEmail, setResetEmail] = useState('');

    useEffect(() => {
        const firestore = firebaseConfig.database().ref('List');
        const user = firebaseConfig.auth().currentUser;
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
        if(user != null)
        {
            const email = user.email;
            setResetEmail(email);
        } 
    },[])

    const handleAddUser = () => {
        const firestore = firebaseConfig.database().ref('List');
        let data = {
            FirstName:FirstName,
            LastName:LastName,
            UserEmail:UserEmail,
            UserName:UserName
        };
        firestore.push(data);
        setFirstName('');
        setLastname('');
        setUserName('');
        setUserEmail('');
    };

    const handleEditUser = () => {
        const firestore = firebaseConfig.database().ref('List').child(userId);
        firestore.update({
            FirstName:aFirstName,
            LastName:aLastName,
            UserName:aUserName,
            UserEmail:aUserEmail
        });
        setaFirstName('');
        setaLastName('');
        setaUserName('');
        setaUserEmail('');
    };

    const handleEditClick = (data) => {
        setaFirstName(data.FirstName);
        setaLastName(data.LastName);
        setaUserName(data.UserName);
        setaUserEmail(data.UserEmail);
        setUserId(data.id);
    };

    const handleDelete = (id) => {
        const firestore = firebaseConfig.database().ref('List').child(id);
        firestore.remove();
    };

    const handleResetEmail = () => {
        firebaseConfig.auth().sendPasswordResetEmail(resetEmail)
        .then(() => {
        // Password reset email sent!
        firebaseConfig.auth().signOut();
        <Redirect to="/login"/>
        })
        .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorCode);
        alert(errorMessage);
        });
    }

    if (!currentUser) {
        return <Redirect to="/login" />; 
    }

    return (   
    <div class="ui hidden divider">
    <Container>
        <h1 class="text-center mt-5 text-capitalize fs-1">Welcome</h1>
        <p class="text-center text-capitalize fs-3">This is data in RealtimeDatabase</p>
        <Grid>
            <Grid.Row columns ="2">
                <Grid.Column>
                    <Segment padded="very">
                        <Form>
                            <Form.Field>
                                <label>FirstName</label>
                                <Input placholder="ชื่อจริง" title="กรุณากรอกข้อมูล"focus value={FirstName} onChange={(e)=>{setFirstName(e.target.value);}}/>
                            </Form.Field>
                            <Form.Field>
                                <label>LastName</label>
                                <Input placholder="นามสกุล" title="กรุณากรอกข้อมูล" focus value={LastName} onChange={(e)=>{setLastname(e.target.value);}}/>
                            </Form.Field>
                            <Form.Field>
                                <label>UserName</label>
                                <Input placholder="ชื่อในระบบ" title="กรุณากรอกข้อมูล"focus value={UserName} onChange={(e)=>{setUserName(e.target.value);}}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Email</label>
                                <Input placholder="อีเมล" title="กรุณากรอกข้อมูล"focus value={UserEmail} onChange={(e)=>{setUserEmail(e.target.value);}}/>
                            </Form.Field>
                            <Form.Field>
                                <Button onClick={handleAddUser} positive> <Icon name="add circle"/> Add User</Button>
                            </Form.Field>
                        </Form>
                    </Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment padded="very">
                        <Form>
                            <Form.Field>
                                <label>FirstName</label>
                                <Input placholder="ชื่อจริง" title="กรุณากรอกข้อมูล"focus value={aFirstName} onChange={(e)=>{setaFirstName(e.target.value);}}/>
                            </Form.Field>
                            <Form.Field>
                                <label>LastName</label>
                                <Input placholder="นามสกุล" title="กรุณากรอกข้อมูล"focus value={aLastName} onChange={(e)=>{setaLastName(e.target.value); }}/>
                            </Form.Field>
                            <Form.Field>
                                <label>UserName</label>
                                <Input placholder="ชื่อในระบบ" title="กรุณากรอกข้อมูล"focus value={aUserName} onChange={(e)=>{setaUserName(e.target.value);}}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Email</label>
                                <Input placholder="อีเมล" title="กรุณากรอกข้อมูล"focus value={aUserEmail}onChange={(e)=>{setaUserEmail(e.target.value);}}/>
                            </Form.Field>
                            <Form.Field>
                                <Button onClick={handleEditUser} primary> 
                                <Icon name="edit"></Icon>Edit User</Button>
                            </Form.Field>
                        </Form>
                    </Segment>
                    </Grid.Column>
            </Grid.Row>
            <Grid.Row columns = "1">
                <Grid.Column >
                        {userData.length == 0 ? (
                        <Segment padded="very">
                            <Header textAlign="center">
                                Oops! There is no data available. Please Enter some data. 
                            </Header>
                        </Segment>) 
                        : (
                        <Segment padded="very">
                            <Table celled singleLine>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>FirstName</Table.HeaderCell>
                                        <Table.HeaderCell>LastName</Table.HeaderCell>
                                        <Table.HeaderCell>UserName</Table.HeaderCell>
                                        <Table.HeaderCell>Email</Table.HeaderCell>
                                        <Table.HeaderCell></Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                {userData.map((data,index)=> {
                                        return (
                                            <Table.Body>
                                            <Table.Cell>{data.FirstName}</Table.Cell>
                                            <Table.Cell>{data.LastName}</Table.Cell>
                                            <Table.Cell>{data.UserName}</Table.Cell>
                                            <Table.Cell>{data.UserEmail}</Table.Cell>
                                            <Table.Cell>
                                                <Button primary onClick={()=>{handleEditClick(data)}}>
                                                    <Icon name="edit"></Icon>
                                                    Edit
                                                </Button>
                                                <Button color="red" onClick={()=>{handleDelete(data.id)}}>
                                                <Icon name="delete"></Icon>
                                                    Delete
                                                </Button>
                                            </Table.Cell>
                                        </Table.Body>
                                        );
                                    })}
                            </Table>
                        </Segment>
                        )}
                </Grid.Column>
            </Grid.Row>
            <Grid.Row columns = "1">
                <Grid.Column>
                    <Segment>
                        <Form>
                            <Form.Field>
                                <label>Email</label>
                                <Input placholder="อีเมล" title="กรุณากรอกอีเมลที่ต้องการจะรีเซ็ท" focus value={resetEmail}/>
                            </Form.Field>
                            <Form.Field>
                                <Button color ="teal" onClick={handleResetEmail}><Icon name ="mail"/>Reset E-mail</Button>
                            </Form.Field>
                        </Form>
                    </Segment>
                </Grid.Column>
            </Grid.Row>
        </Grid>
        </Container>
        <br/>
        <div class = "text-center">
        <button onClick={() => firebaseConfig.auth().signOut()} class="btn btn-danger "> <Icon name="sign-out"/>Sign Out</button>
        </div>
        </div>);
    };
