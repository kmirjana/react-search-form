import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="jumbotron">
      <h1>Firstsite Administration</h1>
      <p>React, Flux, And React router for ultra-responsive web app</p>
      <Link to="about" className="btn btn-primary">
        About
      </Link>
    </div>
  );
}
export default HomePage;
