import { Link } from "react-router-dom";
import "./Page404.css";
import Container from "react-bootstrap/Container";

function Page404() {
  return (
    <div className="Page404 bg-primary text-white d-flex flex-column justify-content-center align-items-center">
      {/* Containerul principal care conține întreaga pagină */}
      <Container className="d-flex flex-column justify-content-center align-items-center">
        <p className="h4 text-center">
          {/* Mesajul principal care explică utilizatorului că pagina căutată nu mai există */}
          Oops... the page you're looking for doesn't (or no longer) exist.
        </p>
        <strong className="error404">404 :(</strong>
        {/* Afișăm eroarea 404 cu un font mai mare */}
        <p className="h4 text-center">
          {/* Mesajul care invită utilizatorul să se întoarcă la pagina principală */}
          Go{" "}
          <Link to="/" className="text-secondary">
            back to the homepage
          </Link>{" "}
          to check out a new article!
        </p>
      </Container>
    </div>
  );
}

export default Page404;
