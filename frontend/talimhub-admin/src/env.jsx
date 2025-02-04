import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Speaking from './pages/Speaking';
import TopicForm from './pages/TopicForm';
import Users from './pages/Users';
import UserForm from './pages/UserForm';

// export const API = "http://localhost:8081/api/v1"
export const API = "https://qaxvachi.uz/api/v1"

export const token = {"Authorization":"Bearer "+localStorage.getItem('token')};

export const LoadingSpinner = () => (
    <div className="flex justify-center items-center">
      <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    </div>
);
  

export const PUBLIC_ROUTERS = [
    {
        path:"/login",
        element:<Login/>
    }
];

export const ADMIN_ROUTERS = [
    {
        path:"/dashboard",
        element:<Dashboard/>
    },
    {
        path:"/users",
        element:<Users/>
    },
    {
        path:"/speakings",
        element:<Speaking/>
    },
    {
        path:"/user-form",
        element:<UserForm/>
    },
    {
        path:"/topic-form",
        element:<TopicForm/>
    }
]