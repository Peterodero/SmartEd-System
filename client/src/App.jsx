import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


import './styles/App.css';
import Dashboard from "./components/teachersDashboard/Dashboard";
import StudentCount from "./components/teachersDashboard/StudentsNumber";

import HomePage from './components/Home';
import Login from "./components/Login";
import SignUp from "./components/Signup";
import ErrorPage from "./components/ErrorPage";
import Description from "./components/Description";
import StudentDashboard from "./components/studentDashboard/StudentDashboard";
import TeachersDashboard from "./components/teachersDashboard/TeachersDashboard";
import ForgotPassword from "./components/ForgotPassword";
import Verification from "./components/Verification";
import LearnOnline from "./components/studentDashboard/LearnOnline";
import NoExam from "./components/studentDashboard/NoExam";
import NewExam from "./components/studentDashboard/NewExam";
import ProtectedRoute from "./components/ProtectedRoute";
import StudentResults from "./components/studentDashboard/StudentResults";
import StudentProfile from "./components/studentDashboard/StudentProfile";
import StudentRecommendations from "./components/studentDashboard/StudentRecommendation";
import LecturerProfile from "./components/teachersDashboard/LecturerProfile";
import AllStudentResults from "./components/teachersDashboard/ViewResults";
import SetQuestions from "./components/teachersDashboard/SetQuestions";
import AdminDashboard from "./components/adminDashboard/AdminsDashboard";
import AdminProfile from "./components/adminDashboard/AdminProfile";
import AllStudentRecommendations from "./components/teachersDashboard/AllStudentsRecommendations";
import AdminLandingPage from "./components/adminDashboard/LandingPage";
import RemoveAllUsers from "./components/adminDashboard/RemoveUsers";
import RegisterLecturer from "./components/adminDashboard/RegisterLecturers";
import HomeHelp from "./components/HomeHelp";
import StudentHelp from "./components/studentDashboard/StudentHelp";
import TeacherHelp from "./components/teachersDashboard/TeacherHelp";
import ResetPassword from "./components/ResetPassword";
import AddAdmin from "./components/adminDashboard/AddAdmin";


function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Description />,
        },
        {
          path: "help",
          element:<HomeHelp/>
        }
      ],
    },
    {
      path: '/signIn',
      element: <Login />,
    },
    {
      path: '/signUp',
      element: <SignUp />,
    },
    {
      path: '/forgotPassword',
      element: <ForgotPassword />,
    },
    {
      path: '/resetPassword',
      element: <ResetPassword />,
    },
    {
      path: '/verification',
      element : <Verification/>
    },
  
    {
      path: '/student',
      element: 
        <ProtectedRoute/>,
       children:[
        {
          path:'/student',
          element:<StudentDashboard />,
          children:[
            {
              index: true,
              element: <NoExam/>
            },
            {
              path: 'newExam',
              element:<NewExam/>
            },
            {
              path: 'studentHelp',
              element:<StudentHelp/>
            },
            {
              path: 'viewResults',
              element:<StudentResults/>
            },
            {
              path: 'courseRecommendations',
              element: <StudentRecommendations/>,
            },
            {
              path: 'viewProfile',
              element: <StudentProfile/>,
            },
            {
              path: 'learn',
              element:<LearnOnline/>
            }
          ]
        }
       ], 
      
    },
    {
      path: '/admin',
      element:<ProtectedRoute/>,
      children: [
        {
        element: <AdminDashboard/>,
        path: '/admin',
        children: [
          {
            index: true,
            element: <AdminLandingPage />,
          },
          {
            path: "adDashboard",
            element: <AdminLandingPage />,
          },
          {
            path: "students",
            element: <StudentCount />,
          },
          {
            path:"registerLecturers",
            element:<RegisterLecturer/>
          },
          {
            path: "addAdmin",
            element: <AddAdmin/>
          },
          {
            path: "removeUsers",
            element: <RemoveAllUsers/>,
          },
  
          {
            path: "adminProfile",
            element: <AdminProfile/>,
          },
        ],
       },
        
      ]
    },
    {
      path: '/lecturer',
      element: <ProtectedRoute/>,
      children: [
        {
        element: <TeachersDashboard/>,
        path: '/lecturer',
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "students",
            element: <StudentCount />,
          },
          
          {
            path: "studentsResults",
            element: <AllStudentResults />,
          },
          {
            path: 'teacherHelp',
            element:<TeacherHelp/>
          },
          {
            path: 'setQuestions',
            element : <SetQuestions/>
          },
          {
            path: 'allRecommendations',
            element : <AllStudentRecommendations/>
          },
      
          {
            path: "lecturerProfile",
            element: <LecturerProfile />,
          },
        ],
       },
        
      ]
      
    }

  ]
  );

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;