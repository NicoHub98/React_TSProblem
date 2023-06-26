import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const Navbar = () => {
  const { toggle, setToggle } = useContext(GlobalContext);

  const handleToggle = () => {
    if (!toggle) {
      document.body.setAttribute("data-bs-theme", "dark");
      setToggle(!toggle);
    } else {
      document.body.setAttribute("data-bs-theme", "light");
      setToggle(!toggle);
    }
  };
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand">TravelSalesmanProblem</a>
        <div className="d-flex" role="search">
          <button className={`btn btn-${toggle}`} onClick={handleToggle}>
            {toggle ? (
              <i className="bi bi-moon-fill"></i>
            ) : (
              <i className="bi bi-brightness-high-fill"></i>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
