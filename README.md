# 📰 News App

This **React-based news app** was developed as part of the **IT School course**, with the purpose of fetching and displaying the latest news articles from various categories such as technology, football, games, and culture. Users can browse news, view article details, and save their favorite articles for later reading. The app is built using **React, React Router, React Bootstrap, and The Guardian API**.

## 🌟 Demo

🌐 [Visit the website on Netlify](https://it-school-news33.netlify.app/)

---

## 🚀 Features

### 📰 News Categories

- Users can explore news from different categories: **Technology**, **Football**, **Games**, **Culture**.
- The news is fetched from **The Guardian API**, ensuring up-to-date content.

### ❤️ Favorites

- Users can **add articles to favorites** for later reading.
- The favorites are stored using **React Context** for state management.
- **Local storage** is used to persist the favorites list across page reloads.
- Articles can be removed from the favorites list with a single click.

### 📜 News Details Page

- Clicking on a news article opens a **detailed view** with information such as:
  - Title, description, and content.
  - Author, date, and image.
- Users can add articles to their favorites directly from the article page.

### 🔍 Pagination

- **Pagination** is implemented to allow users to browse through large sets of news articles without overwhelming them.
- Users can navigate between pages of a news category and explore more articles.

## ⚙️ Technologies Used

- **React** (with hooks like useState, useEffect, useContext)
- **React Router** for navigation between pages
- **React Bootstrap** for styling and responsiveness
- **The Guardian API** for fetching news data
- **React Context API** for managing the state of the favorites list

