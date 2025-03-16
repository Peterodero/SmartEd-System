import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { QueryClient,QueryClientProvider } from "@tanstack/react-query";

import './styles/App.css'

import HomePage from './components/Home'
import Login from "./components/Login";
import SignUp from "./components/Signup";
import ErrorPage from "./components/ErrorPage";
import Description from "./components/Description";
import StudentDashboard from "./components/studentDashboard/StudentDashboard";
import TeachersDashboard from "./components/teachersDashboard/TeachersDashboard";
import Messages from "./components/teachersDashboard/pages/Messages";


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
    
    {path: '/student',
      element: <StudentDashboard/>
    },
    {
      path: '/teacher',
      element: <TeachersDashboard/>,
      children:[
        {index: true,
          element:<Messages/>
        }
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
