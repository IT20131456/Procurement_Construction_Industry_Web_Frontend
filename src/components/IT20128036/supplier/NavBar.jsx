import React, { Component } from "react";

import jwt_decode from "jwt-decode";
import swal from "sweetalert";

import { useLocation, useNavigate, useParams } from "react-router-dom";

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      type: "",
    };
  }

  componentDidMount() {
    document.title = "NavBar";
    if (localStorage.userToken) {
      const usertoken = localStorage.userToken;
      const decoded = jwt_decode(usertoken);
      this.setState({
        type: decoded.type,
      });
    }
  }

  logOut(e) {
    e.preventDefault();
    swal({
      title: "Are you sure you want to log out?",
      text: "",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willLogout) => {
      if (willLogout) {
        swal("Logout successfully!", "", "success").then((value) => {
          if (value) {
            localStorage.removeItem("userToken");

            window.location = "/user/login";
          }
        });
      } else {
        swal("Redirecting...");
      }
    });
  }

  render() {
    const loginRegLink = (
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a
            className="nav-link bg-dark"
            aria-current="page"
            href="/user/login"
            style={{ textDecoration: "none", color: "white" }}
          >
            Sign In
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            aria-current="page"
            href="/supplier/registration"
            style={{ textDecoration: "none", color: "black" }}
          >
            Sign Up
          </a>
        </li>
      </ul>
    );

    let userLink;

    // NavBar Links for supplier
    if (this.state.type === "supplier") {
      userLink = (
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a
              className="nav-link"
              aria-current="page"
              href="/home"
              style={{ textDecoration: "none", color: "black" }}
            >
              Home
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              aria-current="page"
              href="#"
              style={{ textDecoration: "none", color: "black" }}
            >
              Projects
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              aria-current="page"
              href="/suppliers/tenders"
              style={{ textDecoration: "none", color: "black" }}
            >
              Tenders
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              aria-current="page"
              href="#"
              style={{ textDecoration: "none", color: "black" }}
            >
              Add Items
            </a>
          </li>

          <li className="nav-item">
            <a
              className="nav-link"
              aria-current="page"
              href="#"
              style={{ textDecoration: "none", color: "black" }}
            >
              View Items
            </a>
          </li>

          <li className="nav-item">
            <a
              className="nav-link"
              aria-current="page"
              href=""
              style={{ textDecoration: "none", color: "black" }}
            >
              Contact Me
            </a>
          </li>

          <li className="nav-item">
            <a
              className="nav-link"
              aria-current="page"
              href="/supplier/details"
              style={{ textDecoration: "none", color: "black" }}
            >
              Supplier Profile
            </a>
          </li>

          <li className="nav-item">
            <a
              href="/user/login"
              onClick={this.logOut.bind(this)}
              className="nav-link bg-dark"
              style={{ textDecoration: "none", color: "white" }}
            >
              Log out
            </a>
          </li>
        </ul>
      );
    }

    //nav bar for staff
    else if (this.state.type === "staff") {
      userLink = (
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a
              className="nav-link"
              aria-current="page"
              href="/"
              style={{ textDecoration: "none", color: "black" }}
            >
              Home
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              aria-current="page"
              href="#"
              style={{ textDecoration: "none", color: "black" }}
            >
              Projects{" "}
            </a>
          </li>

          <li className="nav-item">
            <a
              className="nav-link"
              aria-current="page"
              href="#"
              style={{ textDecoration: "none", color: "black" }}
            ></a>
          </li>

          <li className="nav-item">
            <a
              className="nav-link"
              aria-current="page"
              href="/supplier/req"
              style={{ textDecoration: "none", color: "black" }}
            >
              Suppliers
            </a>
          </li>

          <li className="nav-item">
            <a
              className="nav-link"
              aria-current="page"
              href="#"
              style={{ textDecoration: "none", color: "black" }}
            >
              Invoices
            </a>
          </li>

          <li className="nav-item">
            <a
              className="nav-link"
              aria-current="page"
              href="/approved/supplier"
              style={{ textDecoration: "none", color: "black" }}
            >
              Approved Suppliers
            </a>
          </li>

          <li className="nav-item">
            <a
              className="nav-link"
              aria-current="page"
              href="/staff/tenders"
              style={{ textDecoration: "none", color: "black" }}
            >
              Purchase Orders
            </a>
          </li>

          <li className="nav-item">
            <a
              href=""
              onClick={this.logOut.bind(this)}
              className="nav-link bg-dark"
              style={{ textDecoration: "none", color: "white" }}
            >
              Log out
            </a>
          </li>
        </ul>
      );
    }

    return (
      <div>
        <nav
          className="navbar navbar-expand-lg navbar-light"
          style={{ background: "#FFFFFF" }}
        >
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              <p>
                <strong>Skyline</strong>
                <strong style={{ textDecoration: "none", color: "#FFB200" }}>
                  &nbsp;&nbsp;Constractors
                </strong>{" "}
              </p>
            </a>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse justify-content-md-center"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0"></ul>
              {localStorage.userToken ? userLink : loginRegLink}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default withRouter(NavBar);
