import { useContext } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./NewsCard.css";
import { removeFromFavorites } from "../store/Favorites/actions";
import { FavoritesContext } from "../store/Favorites/context";

function NewsCard(props) {
  // Extragem dispatch-ul care modifica state-ul aferent stirilor favorite.
  const { favoritesDispatch } = useContext(FavoritesContext);

  // Extragem prop-urile componentei. (Destructurare pentru un acces mai simplu la date)
  const { newsId, imgSrc, title, description, hasCloseButton } = props;

  // Functie pentru a elimina un articol din lista de favorite.
  function handleRemoveFromFavorites(id) {
    const actionResult = removeFromFavorites(id); // Creeaza actiunea de eliminare.
    favoritesDispatch(actionResult); // Trimite actiunea catre reducer pentru actualizare.
  }

  return (
    <Card className="NewsCard h-100 d-flex flex-column justify-content-between align-items-center">
      {/* Link-ul catre pagina de detalii a stirii. EncodeURIComponent se foloseste pentru a evita problemele cu caractere speciale. */}
      <Link to={`/news/${encodeURIComponent(newsId)}`}>
        <Card.Img variant="top" src={imgSrc} />
        <Card.Body>
          <Card.Title>{title}</Card.Title> {/* Afisam titlul stirii. */}
          <Card.Text>{description}</Card.Text> {/* Afisam descrierea stirii. */}
        </Card.Body>
      </Link>
      {/* Afisam butonul de stergere doar daca hasCloseButton este true. */}
      {hasCloseButton && (
        <Button
          variant="light"
          onClick={() => {
            handleRemoveFromFavorites(newsId); // Eliminam stirea din favorite la click.
          }}
        >
          <span className="material-icons text-dark">close</span>
        </Button>
      )}
    </Card>
  );
}

export default NewsCard;
