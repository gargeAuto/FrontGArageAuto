import {createBrowserRouter} from 'react-router-dom'
import HomePage from "./pages/HomePage.tsx";
import Car from './pages/Car.tsx';


const router = createBrowserRouter([
    {
        path: '/',
        element:<HomePage/>,
        //loader: , // données préchargées avant rendu
        // errorElement: <p>Erreur lors du chargement des voitures</p>, // affichage si loader échoue
    },
    {
        // path: '/ajouter',
        // element: <AjoutVoiture/>,
    },
    {
        path: '/select-car',
        element: <Car/>,
        //loader: , // données préchargées avant rendu
        // errorElement: <p>Erreur lors du chargement des voitures</p>, // affichage si loader échoue
    },
])
export default router
