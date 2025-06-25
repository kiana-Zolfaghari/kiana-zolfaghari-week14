import Home from "./home";
import AboutUs from "./About us";
import Login from "./Login";
import Contact from "./Contact";
import { useState } from "react";

function App() {
  const [showHome, setShowHome] = useState(false);
  const [showAboutUs, setshowAboutUs] = useState(false);
  const [showContact, setshowContact] = useState(false);
  const [showLogin, setshowLogin] = useState(false);
  console.log(showHome);

  return (
    <>
      <h1 className="title" style={{ color: "black" }}>
        tabs component with react
      </h1>
      <ul
        style={{
          listStyle: "none",
          color: "black",
          justifyContent: "spaceBetween",
          display: "flex",
          gap: "5rem",
          marginTop: "8rem",
        }}
      >
        <button
          onClick={() => setShowHome((s) => !s)}
          style={{ backgroundColor: "#ffe713", border: "none", color: "black" }}
        >
          <li
            style={{ fontWeight: "800", fontSize: "1.5rem", cursor: "pointer" }}
          >
            home
          </li>
        </button>
        <button
          onClick={() => setshowAboutUs((s) => !s)}
          style={{ backgroundColor: "#ffe713", border: "none", color: "black" }}
        >
          <li
            style={{ fontWeight: "800", fontSize: "1.5rem", cursor: "pointer" }}
          >
            about us
          </li>
        </button>
        <button
          onClick={() => setshowContact((s) => !s)}
          style={{ backgroundColor: "#ffe713", border: "none", color: "black" }}
        >
          <li
            style={{ fontWeight: "800", fontSize: "1.5rem", cursor: "pointer" }}
          >
            contact
          </li>
        </button>
        <button
          onClick={() => setshowLogin((s) => !s)}
          style={{ backgroundColor: "#ffe713", border: "none", color: "black" }}
        >
          <li
            style={{ fontWeight: "800", fontSize: "1.5rem", cursor: "pointer" }}
          >
            login
          </li>
        </button>
      </ul>
      <div>{showHome && <Home />}</div>
      <div>{showContact && <Contact />}</div>
      <div>{showAboutUs && <AboutUs />}</div>
      <div>{showLogin && <Login />}</div>
    </>
  );
}

export default App;
