import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useFetch } from "../utils/hooks/useFetch";
import { getNewsDetailsEndpoint } from "../api/endpoints";
import { getNewsDetails } from "../api/adaptors";
import Button from "react-bootstrap/Button";
import "./NewsDetails.css";
import { getFormattedDate } from "../utils/date";
import { addToFavorites } from "../store/Favorites/actions";
import { FavoritesContext } from "../store/Favorites/context";

function NewsDetails() {
  // State pentru a controla vizibilitatea alertei de succes
  const [alertVisible, setAlertVisible] = useState(false);

  // Extragem contextul pentru a accesa dispatch-ul de la favorite
  const { favoritesDispatch } = useContext(FavoritesContext);

  // Extragem 'newsId' din URL
  let { newsId } = useParams();
  newsId = decodeURIComponent(newsId); // Decodăm ID-ul știrii

  // Generăm endpoint-ul pentru detaliile știrii
  const newsDetailsEndpoint = getNewsDetailsEndpoint(newsId);

  // Fetch-uim detaliile știrii
  const newsDetails = useFetch(newsDetailsEndpoint);

  // Adaptăm datele de la server la formatul necesar
  const adaptedNewsDetails = getNewsDetails(newsDetails);

  // Extragem câmpurile relevante din datele știrii
  const { title, description, image, date, author, content, thumbnail } =
    adaptedNewsDetails;

  // Formatarea datei
  const formattedDate = getFormattedDate(date);

  // Funcția pentru a adăuga o știre la favorite
  function handleAddToFavorites(product) {
    const actionResult = addToFavorites(product); // Acțiunea de adăugare la favorite
    favoritesDispatch(actionResult); // Dispatch al acțiunii pentru a actualiza starea globală

    // Afișăm alerta de succes
    setAlertVisible(true);

    // După 2 secunde, ascundem alerta
    setTimeout(() => {
      setAlertVisible(false);
    }, 2000);
  }

  return (
    <Layout>
      <Container className="NewsDetails my-5">
        {/* Afișăm alerta de succes când articolul este adăugat la favorite */}
        {alertVisible && (
          <div className="alert alert-success fixed-top" role="alert">
            Articolul a fost adăugat la favorite!
          </div>
        )}

        <Row className="d-flex justify-content-center">
          <Col xs={12} lg={8}>
            {/* Titlul știrii */}
            <h1 className="pt-3 mb-5">{title}</h1>
            {/* Descrierea scurtă a știrii */}
            <p className="fw-bold">{description}</p>
            {/* Imaginea știrii */}
            <div
              dangerouslySetInnerHTML={{ __html: image }}
              className="mb-4"
            ></div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              {/* Autorul și data publicării */}
              <div className="fw-bold">
                <p>{author}</p>
                <p className="mb-0">{formattedDate}</p>
              </div>
              {/* Butonul pentru a adăuga știrea la favorite */}
              <Button
                onClick={() => {
                  handleAddToFavorites({
                    id: newsId,
                    thumbnail,
                    title,
                    description,
                    hasCloseButton: true,
                  });
                }}
              >
                Adaugă la favorite
              </Button>
            </div>
            {/* Conținutul complet al știrii */}
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default NewsDetails;
