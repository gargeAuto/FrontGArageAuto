import {createBrowserRouter} from 'react-router'
import HomePage from "./pages/HomePage.tsx";
import Car from './pages/Car.tsx';
import RegisterForm from './pages/RegisterForm.tsx';
import LoginForm from './pages/LoginForm.tsx';
import LayoutWithNavBar from "./Layout/LayoutWithNavBar.tsx";
import Validation from "./pages/validation.tsx";
import PrivateRoute from "./component/PrivateRoute.tsx";
import EmailValidation from "./pages/EmailValidation.tsx";
import ProtectedRoute from "./configue/ProtectedRoute.ts";
import DashboardGaragiste from "./pages/DashboardGaragiste.tsx";
import LayoutWithoutFooter from "./Layout/LayoutWithoutFooter.tsx";


const router = createBrowserRouter([
    {
     path: "validation-email",
     element: <EmailValidation/>,
    },
    {
      path:"dashboard-garage",
        element: <ProtectedRoute role={"admin"}>
            <LayoutWithoutFooter>
                <DashboardGaragiste/>
            </LayoutWithoutFooter>
        </ProtectedRoute>,
    },
    {
        //loader: , // données préchargées avant rendu
        // errorElement: <p>Erreur lors du chargement des voitures</p>, // affichage si loader échoue
        path: "/",
        element: <LayoutWithNavBar/>,
        children: [
            {path: "", element: <HomePage/>},
            {path: "select-car", element: <Car/>},
            {path: "Register-Form", element: <RegisterForm/>},
            {path: "Login-Form", element: <LoginForm/>},
            {path: "Validation", element:
                <PrivateRoute>
                    <Validation/>
                </PrivateRoute>

            },
        ],

    },
])
export default router
