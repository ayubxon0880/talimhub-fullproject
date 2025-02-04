
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import HowToWorks from "./pages/HowToWorks/HowToWorks";
import { CONTACT_ROUTE, HOME_ROUTE, HOWTOWORKS_ROUTE, NOTFOUND_ROUTE } from "./utils/consts";

export const routes = [
    { path: HOME_ROUTE, Component: Home },
    { path: CONTACT_ROUTE, Component: Contact },
    { path: HOWTOWORKS_ROUTE, Component: HowToWorks },
    { path: NOTFOUND_ROUTE, Component: NotFound },
]
