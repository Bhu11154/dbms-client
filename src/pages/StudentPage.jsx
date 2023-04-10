import { useState, useEffect } from "react";
import {useParams, useNavigate} from 'react-router-dom'
import axios from "axios";
import { Table, Input, Button, Dimmer, Loader } from 'semantic-ui-react'
import BackButton from "../components/BackButton";
import NavButton from "../components/NavButton";
import LogoutBtn from "../components/LogoutBtn";
var isAdmin = '0';

const StudentPage = ({ip}) =>{
  const [courses, setCourses] = useState([]);
  const [student, setStudent] = useState({});
  const [Grade, setGrade] = useState('');
  const {id} = useParams();
  const navigate = useNavigate();
  const [isEmpty, setIsEmpty] = useState(true);
  const editGrade = async (id,grade) =>{
    try{
      const res = await axios.put(`${ip}/editGrade/${id}/${grade}`);
    }catch(err){
      console.log(err);
    }
    setIsEmpty(true);
    window.location.reload();
  }
    useEffect(()=>{
        isAdmin = localStorage.getItem('admin') === '1';
        if(!isAdmin){
          if(localStorage.getItem('user') === 'None'){
            navigate('/Login');
          }
          if(localStorage.getItem('user') !== `${id}`){
            navigate(`/student/${localStorage.getItem('user')}`)
          }
        }
        const fetchCourses = async () => {
          try{
              const res = await axios.get(`${ip}/coursesTaken/${id}`)
              setCourses(res.data);
          }catch(err){
              console.log(err);
          }
        };
        const fetchStudentInfo = async () =>{
          try{
            const res = await axios.get(`${ip}/student/${id}`)
            setIsEmpty(res.data.length === 0 || res.data[0] === {});
            setStudent(res.data[0]);
          }catch(err){
              console.log(err);
          }
        }
        fetchStudentInfo();
        fetchCourses();
    },[])
    return (
      <div>
        <BackButton/>
        <LogoutBtn />
        <h1 style={{marginLeft:"43%", marginTop: "50px"}}>Student Info</h1>
        <NavButton name={'Courses'} pos={20} top={9}/>
        <NavButton name={'Departments'} pos={5} top={9}/>
        <Table definition celled inverted selectable style={{width: "30%", marginLeft: "35%"}}>
          <Table.Header>
            <Table.Row>
              {/* <Table.HeaderCell />
              <Table.HeaderCell /> */}
            </Table.Row>
          </Table.Header>

            <Table.Body>{isEmpty && 
                          <Dimmer active>
                            <Loader />
                          </Dimmer>
                      }

              <Table.Row>
                <Table.Cell>Name</Table.Cell>
                <Table.Cell>{student.name}</Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>Roll No.</Table.Cell>
                <Table.Cell>{student.rollno}</Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>ID</Table.Cell>
                <Table.Cell>{student.id}</Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>Department</Table.Cell>
                <Table.Cell>{student.department}</Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>DOB</Table.Cell>
                <Table.Cell>{student.dob}</Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>Password</Table.Cell>
                <Table.Cell>{student.password}</Table.Cell>
              </Table.Row>

            </Table.Body>
        </Table>

        <h1 style={{marginLeft:"40%", marginTop: "50px"}}>Courses Enrolled: </h1>
        <NavButton name={'Enrollments'} pos={18} top={57}/>
        <Table celled inverted selectable style={{width: "30%", marginLeft: "35%"}} color='teal' key='teal'>
        <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Course</Table.HeaderCell>
              <Table.HeaderCell>Grade</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {courses.map((course) => {
              return(
                <>
                  <Table.Row>
                    <Table.Cell>{course.name}</Table.Cell>
                    <Table.Cell>
                    {isAdmin && 
                      <form onSubmit={(e)=> e.preventDefault()} style={{display: "flex", justifyContent: "space-around"}}>
                        <Input placeholder={course.grade} onChange={(e)=> setGrade(e.target.value)} style={{width:"50px"}}/>
                        <Button primary onClick={() =>{if(Grade !== '') {editGrade(course.id, Grade); }}}>
                          Edit
                        </Button>
                      </form>
                    }
                    {!isAdmin && <Input placeholder={course.grade} value={course.grade} style={{width:"50px"}}/>}
                    </Table.Cell>
                  </Table.Row>
                </>
              )
            })}
        </Table.Body>
        </Table>
      </div>
    );
  }
  
export default StudentPage;