import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Homepage from './pages/Homepage';
import StudentPage from './pages/StudentPage';
import AllStudents from './pages/AllStudents';
import EnrollmentPage from './pages/Enrollments';
import CoursesPage from './pages/CoursesPage';
import DeptPage from './pages/Departments';
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';

const ipAddr = 'https://dbms-server-backend-2.onrender.com';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login ip={ipAddr}/>}/>
        <Route path="/student/:id" element={<StudentPage ip={ipAddr}/>}/>
        <Route path="/Students" element={<AllStudents ip={ipAddr}/>}/>
        <Route path="/Enrollments" element={<EnrollmentPage ip={ipAddr}/>}/>
        <Route path="/Courses" element={<CoursesPage ip={ipAddr}/>}/>
        <Route path="/Departments" element={<DeptPage ip={ipAddr}/>}/>
        <Route path="/Register" element={<RegisterPage ip={ipAddr}/>}/>
        <Route path="/Login" element={<LoginPage ip={ipAddr}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
