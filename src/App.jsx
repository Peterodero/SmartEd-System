import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { QueryClient,QueryClientProvider } from "@tanstack/react-query";

import './styles/App.css'
import Dashboard from "./components/teachersDashboard/pages/Dashboard"
import Classes from "./components/teachersDashboard/pages/Classes"
import Events from "./components/teachersDashboard/pages/Events"
import Exams from "./components/teachersDashboard/pages/Exams"
import NoticeBoard from "./components/teachersDashboard/pages/NoticeBoard"
import Routine from "./components/teachersDashboard/pages/Routine"
import Students from "./components/teachersDashboard/pages/Students"
import Subjects from "./components/teachersDashboard/pages/Subjects"

import HomePage from './components/Home'
import Login from "./components/Login";
import SignUp from "./components/Signup";
import ErrorPage from "./components/ErrorPage";
import Description from "./components/Description";
import StudentDashboard from "./components/studentDashboard/StudentDashboard";
import TeachersDashboard from "./components/teachersDashboard/TeachersDashboard";
import ForgotPassword from "./components/ForgotPassword";


function App() {
  
  const router = createBrowserRouter([
    {path:'/',
      element: <HomePage/>,
      errorElement: <ErrorPage/>,
      children: [
        {index: true,
          element: <Description/>
        }
        
      ]
    },
    {path: '/signIn',
      element:<Login/>
    },
    {
      path:'/forgotPassword',
      element:<ForgotPassword/>
    },
    
    {path: '/student',
      element: <StudentDashboard/>
    },
    {
      path: '/teacher',
      element: <TeachersDashboard/>,
      children:[
        {index: true,
          element:<Dashboard/>
        }, 
        {
          path: "dashboard",
          element:<Dashboard/>

        },
        {
          path: "students",
          element:<Students/>

        },
        {
          path: "subjects",
          element:<Subjects/>

        },
        {
          path: "classes",
          element:<Classes/>

        },
        {
          path: "routine",
          element:<Routine/>

        },
        {
          path: "exams",
          element:<Exams/>

        },
        {
          path: "notice",
          element:<NoticeBoard/>

        },
        
        {
          path: "events",
          element:<Events/>

        },
      ]
    },
   
    {path: '/signUp',
      element: <SignUp/>
    }
  ])
  
  const queryClient = new QueryClient();
 
  return (
    <QueryClientProvider client={queryClient} >
      <RouterProvider router={router}/>
    </QueryClientProvider>
    
  )
}

export default App
