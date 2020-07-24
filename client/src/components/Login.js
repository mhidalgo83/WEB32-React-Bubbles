import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { NavLink, useHistory } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  const { username, password } = user;
  const { push } = useHistory();
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post(`api/login`, user)
      .then((res) => {
        localStorage.setItem("token", res.data.payload);
        setUser({ username: "", password: "" });
        push("/bubbles");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <header>
        <nav>
          <NavLink to="/">Login</NavLink>
          <NavLink to="/bubbles">Bubbles</NavLink>
        </nav>
      </header>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
          placeholder="Enter username"
        ></input>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="Enter password"
        ></input>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Login;
