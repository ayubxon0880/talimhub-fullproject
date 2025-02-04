import Dashboard from './pages/Dashboard';
import Speaking from './pages/Speaking';
import Profile from './pages/Profile';
import AudioRecorder from './pages/AudioRecorder';
import MySpeaking from './pages/MySpeaking';
import UserDetail from './pages/UserDetail';
import SingleSpeaking from './pages/SingleSpeaking';
import FullMock from './pages/Mock/FullMock';
import MyMocks from './pages/Mock/MyMocks';
import SingleMock from './pages/Mock/SingleMock';
import Listening from './pages/Listening';

export const API = "https://qaxvachi.uz/api/v1"
// export const API = "http://localhost:8081/api/v1"

export const token = {"Authorization":"Bearer "+localStorage.getItem('token')};

export const LoadingSpinner = () => (
    <div className="flex justify-center items-center">
      <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin">Sabr</div>
    </div>
);

export const STUDENT_ROUTERS = [
    {
        path:"/dashboard",
        element:<Listening/>
    },
    {
        path:"/speaking",
        element:<Speaking/>
    },
    {
        path:"/audio-record",
        element:<AudioRecorder/>
    },
    {
        path:"/full-speaking-mock",
        element:<FullMock/>
    },
    {
        path:"/my-mocks",
        element:<MyMocks/>
    },
    {
        path:"/user-speaking/:id",
        element:<MySpeaking/>
    },
    {
        path:"/profile",
        element:<Profile/>
    },
    {
        path:"/user-detail/:id",
        element:<UserDetail/>
    },
    // {
    //     path:"/ceo",
    //     element:<CEO/>
    // },
    {
        path:"/speaking/:id",
        element:<SingleSpeaking/>
    },
    {
        path:"/mock-feedback/:id",
        element:<SingleMock/>
    }
]