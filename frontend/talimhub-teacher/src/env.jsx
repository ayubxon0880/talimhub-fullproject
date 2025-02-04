import Dashboard from './pages/Dashboard';
import Speaking from './pages/Speaking';
import Profile from './pages/Profile';
import UserDetail from './pages/UserDetail';
import SingleSpeaking from './pages/SingleSpeaking';
import MyFeedbacks from './pages/MyFeedbacks';
import MockCheck from './pages/MockCheck';
import Mocks from './pages/Mocks';
import MocksIWasChecked from './pages/MocksIWasChecked';
import SingleMock from './pages/SingleMock';

export const API = "https://qaxvachi.uz/api/v1"
// export const API = "http://localhost:8081/api/v1"

export const token = {"Authorization":"Bearer "+localStorage.getItem('token')};

export const LoadingSpinner = () => (
    <div className="flex justify-center items-center">
      <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin">Sabr</div>
    </div>
);
  
export const TEACHER_ROUTERS = [
    {
        path:"/dashboard",
        element:<Dashboard/>
    },
    {
        path:"/speaking",
        element:<Speaking/>
    },
    {
        path:"/mocks",
        element:<Mocks/>
    },
    {
        path:"/checked-mocks",
        element:<MocksIWasChecked/>
    },
    {
        path:"/mock-feedback/:id",
        element:<SingleMock/>
    },
    {
        path:"/profile",
        element:<Profile/>
    },
    {
        path:"/user-detail/:id",
        element:<UserDetail/>
    },
    {
        path:"/speaking/:id",
        element:<SingleSpeaking/>
    },
    {
        path:"/mock/:id",
        element:<MockCheck/>
    },
    {
        path:"/my-feedbacks",
        element:<MyFeedbacks/>
    }
]