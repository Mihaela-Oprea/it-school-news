import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import { useFetch } from "../utils/hooks/useFetch";
import { getNewsCategoriesEndpoint } from "../api/endpoints";
import { getNewsList } from "../api/adaptors";
import NewsCardList from "../components/NewsCardList";
import Pagination from "../components/Pagination";

function NewsCategory() {
  // Extragem parametrul 'categoryId' din URL, care reprezintă categoria de știri
  const { categoryId } = useParams();

  // Extragem parametrul de query 'page' din URL (pentru a gestiona paginarea)
  let [queryParams] = useSearchParams();
  let currentPage = queryParams.get("page");

  // Dacă nu avem parametru 'page', considerăm că suntem pe prima pagină
  if (!currentPage) {
    currentPage = 1;
  }

  // Generăm endpoint-ul pentru categoria curentă, pe baza 'categoryId' și 'currentPage'
  const newsCategoryEndpoint = getNewsCategoriesEndpoint(
    categoryId,
    currentPage
  );

  // Fetch-uim știrile pentru categoria curentă
  const news = useFetch(newsCategoryEndpoint);

  // Adaptăm datele primite de la server în formatul necesar pentru componentele React
  const adaptedNewsList = getNewsList(news);

  // Setăm titlul categoriei în funcție de 'categoryId'
  let title = "";
  switch (categoryId) {
    case "technology":
      title = "Tech";
      break;
    case "football":
      title = "Football";
      break;
    case "games":
      title = "Games";
      break;
    case "culture":
      title = "Culture";
      break;
    default:
      title = "Unknown Category";
      break;
  }

  return (
    <Layout>
      <Container className="my-5">
        <h1 className="mb-5 pt-3">{title}</h1>
        {/* Afișăm lista de știri pentru categoria respectivă */}
        <NewsCardList newsList={adaptedNewsList} />
        {/* Afișăm paginarea pentru a naviga între pagini */}
        <Pagination active={currentPage} baseUrl={`/category/${categoryId}`} />
      </Container>
    </Layout>
  );
}

export default NewsCategory;
