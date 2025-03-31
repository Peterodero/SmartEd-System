import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


import './styles/App.css';
import Dashboard from "./components/teachersDashboard/pages/Dashboard";
import Classes from "./components/teachersDashboard/pages/Classes";
import Events from "./components/teachersDashboard/pages/Events";
import Exams from "./components/teachersDashboard/pages/Exams";
import NoticeBoard from "./components/teachersDashboard/pages/NoticeBoard";
import Routine from "./components/teachersDashboard/pages/Routine";
import Students from "./components/teachersDashboard/pages/Students";
import Subjects from "./components/teachersDashboard/pages/Subjects";
import Navbar from './components/parentDashboard/domain/Navbar';
import Dashbod from './components/parentDashboard/domain/Dashboard1'; // Corrected import
import StudentResults from './components/parentDashboard/domain/StudentResults';
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
import { useCallback, useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  const [questions, setQuestions] = useState([]);

  const handleStartQuiz = useCallback(async()=>{

    try{

      const response = await fetch("http://localhost:3000/questions");
      const data = await response.json();
      console.log("Data is" + data);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  

    if (data.candidates && data.candidates.length > 0) {
      let textResponse = data.candidates[0].content.parts[0].text.trim();
      textResponse = textResponse.replace(/```json/g, "").replace(/```/g, "").trim();


      if (!textResponse.startsWith("{") && !textResponse.startsWith("[")) {
        throw new Error("Invalid JSON format: Response does not start with '{' or '['");
      }

      const questions = JSON.parse(textResponse); 

      const newQuestions = questions.questions

      console.log("Extracted Questions:", newQuestions);

  
    setQuestions(newQuestions || []);


      return newQuestions;
    } else {
      console.error("No valid response from API");
    }

  }
  // eslint-disable-next-line no-unused-vars
  catch(error){
     console.error("Error fetching the questions")
  }
  

    
},[]); 


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
          element:<StudentDashboard/>,
          children:[
            {
              index: true,
              element: <NoExam/>
            },
            {
              path: 'newExam',
              element:<NewExam questions={questions}/>
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
      path: '/teacher',
      element: <TeachersDashboard />,
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
          element: <Students />,
        },
        {
          path: "subjects",
          element: <Subjects />,
        },
        {
          path: "classes",
          element: <Classes />,
        },
        {
          path: "routine",
          element: <Routine />,
        },
        {
          path: "exams",
          element: <Exams />,
        },
        {
          path: "notice",
          element: <NoticeBoard />,
        },

        {
          path: "events",
          element: <Events />,
        },
      ],
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