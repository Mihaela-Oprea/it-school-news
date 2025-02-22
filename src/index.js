// Importăm funcția pentru a crea root-ul aplicației în DOM
import { createRoot } from "react-dom/client";
// Importăm aplicația principală
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

// Selectăm elementul din DOM unde vom monta aplicația
const container = document.getElementById("root");

// Creăm root-ul aplicației
const root = createRoot(container);

// Randăm aplicația principală în DOM
root.render(<App />);
