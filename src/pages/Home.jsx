import React from "react";
import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import { useFetch } from "../utils/hooks/useFetch";
import { getNewsCategoriesEndpoint } from "../api/endpoints";
import NewsCardList from "../components/NewsCardList";
import { getNewsList } from "../api/adaptors";
import { Link } from "react-router-dom";

function Home() {
  // Generăm endpoint-urile pentru categoriile de știri: tehnologie și fotbal
  const technologyNewsEndpoint = getNewsCategoriesEndpoint("technology", 1, 6);
  const footballNewsEndpoint = getNewsCategoriesEndpoint("football", 1, 6);

  // Fetch-uim datele de la server pentru fiecare categorie
  let technologyData = useFetch(technologyNewsEndpoint);
  let footballData = useFetch(footballNewsEndpoint);

  // Adaptăm datele de la server în formatul necesar pentru componentele React
  const adaptedTechnologyData = getNewsList(technologyData);
  const adaptedFootballData = getNewsList(footballData);

  return (
    <Layout>
      {/* Secțiunea pentru știri de tehnologie */}
      <section className="tech my-5">
        <Container>
          <h1 className="mb-5 pt-3">Tech</h1>
          {/* Afișăm lista de știri despre tehnologie */}
          <NewsCardList newsList={adaptedTechnologyData} />
          {/* Link către pagina cu toate știrile de tehnologie */}
          <p>
            See all the news related to technology in the section{" "}
            <Link to="/category/technology" className="text-secondary">
              Tech
            </Link>
            .
          </p>
        </Container>
      </section>

      {/* Secțiunea pentru știri de fotbal */}
      <section className="football my-5">
        <Container>
          <h1 className="mb-5 pt-3">Football</h1>
          {/* Afișăm lista de știri despre fotbal */}
          <NewsCardList newsList={adaptedFootballData} />
          {/* Link către pagina cu toate știrile de fotbal */}
          <p>
            See all the news related to technology in the section{" "}
            <Link to="/category/football" className="text-secondary">
              Football
            </Link>
            .
          </p>
        </Container>
      </section>

      {/* Secțiunea pentru favorite */}
      <section className="favorites my-5">
        <Container>
          <h1 className="mb-5 pt-3">Favorite</h1>
          {/* Informații despre cum să adaugi știri la favorite */}
          <p>Do you want to save your favorite news to read them later?</p>
          <p>
            Within each news article, you'll find a button that allows you to
            add the article to your favorites.
          </p>
          <p className="pb-3">
            Visit the section{" "}
            <Link to="/favorites" className="text-secondary">
              Favorite
            </Link>{" "}
            to see the added news.
          </p>
        </Container>
      </section>
    </Layout>
  );
}

export default Home;
