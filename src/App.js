// Importăm componentele necesare pentru rutare (navigarea între pagini)
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Importăm paginile principale ale aplicației
import Page404 from "./pages/Page404";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import NewsCategory from "./pages/NewsCategory";
import NewsDetails from "./pages/NewsDetails";
// Importăm funcționalități pentru gestionarea stării globale
import { useLocalStorage } from "./utils/hooks/useLocalStorage";
import { useReducer, useEffect } from "react";
import { FavoritesContext } from "./store/Favorites/context";
import { initialState, favoritesReducer } from "./store/Favorites/reducer";

// Definim rutele aplicației și asociem fiecare pagină cu o cale specifică
const router = createBrowserRouter([
  {
    path: "/", // Ruta principală (pagina de acasă)
    element: <Home />, // Componenta care se va reda pe ruta principală
    errorElement: <Page404 />, // În caz de rută invalidă, se va reda pagina de eroare
  },
  {
    path: "/favorites", // Ruta pentru pagina de favorite
    element: <Favorites />,
  },
  {
    path: "/category/:categoryId", // Ruta dinamică pentru filtrarea pe categorii
    element: <NewsCategory />,
  },
  {
    path: "/news/:newsId", // Ruta dinamică pentru afișarea detaliilor unei știri
    element: <NewsDetails />,
  },
]);

function App() {
  // Preluăm lista de favorite din localStorage sau folosim starea inițială dacă nu există nimic
  const [storedFavorites, setStoredFavorites] = useLocalStorage(
    "favorites", // Cheia sub care stocăm lista de favorite în localStorage
    initialState // Valoarea implicită dacă localStorage nu conține date
  );

  // Inițializăm reducer-ul pentru gestionarea stării favorite, folosind datele din localStorage
  const [favoritesState, favoritesDispatch] = useReducer(
    favoritesReducer, // Reducer-ul care gestionează acțiunile asupra listei de favorite
    storedFavorites // Starea inițială preluată din localStorage
  );

  // Salvăm automat lista de favorite în localStorage de fiecare dată când aceasta se modifică
  useEffect(() => {
    setStoredFavorites(favoritesState); // Actualizăm localStorage cu starea curentă a favorite-urilor
  }, [favoritesState, setStoredFavorites]);

  // Creăm obiectul care va fi transmis contextului global
  const favoritesContextValue = {
    favoritesState, // Starea curentă a favorite-urilor
    favoritesDispatch, // Funcția de dispatch pentru modificarea stării favorite-urilor
  };

  return (
    <div className="App">
      {/* Furnizăm contextul global pentru întreaga aplicație */}
      <FavoritesContext.Provider value={favoritesContextValue}>
        {/* Configurăm provider-ul de rutare pentru a permite navigarea între pagini */}
        <RouterProvider router={router} />
      </FavoritesContext.Provider>
    </div>
  );
}

export default App;
