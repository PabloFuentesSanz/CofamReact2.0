import { useTheme } from "../ThemeContext";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

const Header = () => {
  const { darkMode, setDarkMode } = useTheme();

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="/">
          <img src="https://imgs.search.brave.com/jYPueedqIwW39kirQ8Twjwg7auXJJHnY1baIKGvGJLY/rs:fit:1078:160:1/g:ce/aHR0cHM6Ly90ZWph/ZG9zLWNvZmFtLmVz/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDIx/LzAzL0xldC1FTVBS/RVNBLVRFSkFET1Mt/Q29mYW0tZGUtTUFE/UklELnBuZw" />
        </Navbar.Brand>
        <Navbar.Toggle />
        <br></br>
        <Navbar.Collapse>
          <Button
            as={Link}
            to="/"
            variant="light"
            className="buttonMargin"
          >
            🔎
          </Button>
          <Button
            as={Link}
            to="/new"
            variant="light"
            className="buttonMargin"
          >
            ➕
          </Button>
          <Button variant="light" onClick={handleToggleDarkMode}>
            {darkMode ? "☀️" : "🌙"}
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
