import Home from "./home";
import AboutUs from "./About us";
import Login from "./Login";
import Contact from "./Contact";
import { useState } from "react";

function App() {
  const [activeTab, setActiveTab] = useState("home");

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
          onClick={() => setActiveTab("home")}
          style={{ backgroundColor: "#ffe713", border: "none", color: "black" }}
        >
          <li
            style={{ fontWeight: "800", fontSize: "1.5rem", cursor: "pointer" }}
          >
            home
          </li>
        </button>
        <button
          onClick={() => setActiveTab("about")}
          style={{ backgroundColor: "#ffe713", border: "none", color: "black" }}
        >
          <li
            style={{ fontWeight: "800", fontSize: "1.5rem", cursor: "pointer" }}
          >
            about us
          </li>
        </button>
        <button
          onClick={() => setActiveTab("contact")}
          style={{ backgroundColor: "#ffe713", border: "none", color: "black" }}
        >
          <li
            style={{ fontWeight: "800", fontSize: "1.5rem", cursor: "pointer" }}
          >
            contact
          </li>
        </button>
        <button
          onClick={() => setActiveTab("login")}
          style={{ backgroundColor: "#ffe713", border: "none", color: "black" }}
        >
          <li
            style={{ fontWeight: "800", fontSize: "1.5rem", cursor: "pointer" }}
          >
            login
          </li>
        </button>
      </ul>

      <div style={{ marginTop: "2rem" }}>
        {activeTab === "home" && <Home />}
        {activeTab === "about" && <AboutUs />}
        {activeTab === "contact" && <Contact />}
        {activeTab === "login" && <Login />}
      </div>
    </>
  );
}

export default App;
