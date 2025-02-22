import Container from "react-bootstrap/Container";

function Footer() {
  const currentYear = new Date().getFullYear(); // Obținem anul curent

  return (
    <footer className="bg-dark">
      <Container>
        <p className="text-light text-center m-0 py-3">
          IT School Romania © {currentYear}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
