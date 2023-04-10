import { useState, useEffect } from "react";
import { Button, Checkbox, Form, Input } from 'semantic-ui-react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavButton from "../components/NavButton";
const RegisterPage = ({ip}) =>{
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [rollno, setRoll] = useState('');
    const [dob, setDob] = useState('');
    const [password, setPassword] = useState('');
    const [dept, setDept] = useState('');
    const navigate = useNavigate();
    const insertStudent = async () => {
        try{
            const res = await axios.post(`${ip}/insertStudent`, {
            id : id,
            name : name,
            rollno: rollno,
            dob : dob,
            department: dept,
            password: password,
            Cgpa : "0.0"
          });
        }catch(err){
          console.log(err);
        }
      }
    useEffect(()=>{
        localStorage.setItem('admin', '0');
    },[])
    return (
      <>
        <h1 style={{marginLeft:"45%", marginTop: "50px"}}>Register</h1>
        <NavButton name={'Login'} pos={15} top={9}/>
        <div style={{width:"300px", margin:'auto', paddingBottom:"15px", paddingLeft:"15px", paddingRight:"15px", paddingTop:"0px"}}>
            <Form style={{width: "300px", marginTop: "40px"}} onSubmit={async (e) => {
                e.preventDefault();
                //console.log(name);
                if(name !== '' && id !== '' && rollno !== '' && dob !== '' && password !=='' && dept !== ''){
                    insertStudent();
                    navigate(`/Login`)
                }else{
                    console.log('Err');
                }
            } } >
                <Form.Field>
                    <label>Student ID <span>(Must be unique)</span> </label>
                    <input placeholder='Student ID' onChange={(e) => setId(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Name</label>
                    <input placeholder='Name' onChange={(e) => setName(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Roll No.</label>
                    <input placeholder='Roll no.' onChange={(e) => setRoll(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Dob</label>
                    <input placeholder='Dob' onChange={(e) => setDob(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Department</label>
                    {/* <input placeholder='Department'/> */}
                    <Input list='depts' placeholder='Department' onChange={(e) => setDept(e.target.value)}/>
                        <datalist id='depts'>
                        <option value='1'>Mathematics</option>
                        <option value='2'>Computer Science</option>
                        <option value='3'>Chemical</option>
                        <option value='4'>Electronics</option>
                        <option value='5'>Mechanical</option>
                        <option value='6'>Data Science</option>
                        <option value='7'>Physics</option>
                        <option value='8'>Instrumentation</option>
                        </datalist>
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input placeholder='Password' type="password" onChange={(e) => setPassword(e.target.value)}/>
                </Form.Field>
                <Button positive >Register</Button>
            </Form>
        </div>
      </>
    );
  }
  
export default RegisterPage;