import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


import './styles/App.css';
import Dashboard from "./components/teachersDashboard/Dashboard";
import StudentCount from "./components/teachersDashboard/StudentsNumber";
import Navbar from './components/parentDashboard/domain/Navbar';
import Dashbod from './components/parentDashboard/domain/Dashboard1'; // Corrected import
import Talks from './components/parentDashboard/domain/Talks';

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
            path: "lecturerProfile",
            element: <LecturerProfile />,
          },
        ],
       },
        
      ]
      
    },

    {
      path: "/parent",
      element: (
        <div>
          <Navbar onLogout={() => console.log("logout")} userName={"Kennah"} />
          <Outlet />
        </div>
      ),
      children: [
        { index: true, element: <Dashbod /> },
        { path: "dashboard", element: <Dashbod /> },
        { path: "results", element: <StudentResults /> },
        { path: "talks", element: <Talks /> },
      ],
    },

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