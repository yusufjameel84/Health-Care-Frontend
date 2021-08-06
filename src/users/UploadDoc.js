import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth/index";
import { Link } from "react-router-dom";
import { getDoctors } from "./apis";
import { Button } from "react-bootstrap";
import axios from "axios";
import moment from "moment";
import { Alert } from "react-bootstrap";

const UserDashboard = () => {
  const [history, setHistory] = useState([]);
  const [selectedFile, setSelectFile] = useState(null);
  const [text, setText] = useState("");
  const [showsuc, setshowsuc] = useState(false);
  const {
    user: { _id, name, email, role },
    token,
  } = isAuthenticated();
  const loadPurchaseHistory = () => {
    getDoctors()
      .then((data) => {
        if (data.success === false) {
          console.log("error");
        } else {
          setHistory(data.doctors);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    loadPurchaseHistory();
  }, []);
  const userLinks = () => {
    return (
      <div className="card">
        <h3 className="card-header">User Links</h3>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/user/dashboard">
              Dashboard
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const userInfo = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">User Information</h3>
        <ul className="list-group">
          <li className="list-group-item">{name}</li>
          <li className="list-group-item">{email}</li>
          {/* <li className="list-group-item">{role === 1
                            ? `Admin`
                            : `Registered User`}</li> */}
        </ul>
      </div>
    );
  };

  const purchaseHistory = (history) => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">All doctors</h3>
        <ul className="list-group">
          <li className="list-group-item">
            {history &&
              history.length > 0 &&
              history.map((h, i) => {
                return (
                  <li key={i} className="list-group-item">
                    <span style={{ marginRight: "20px" }}>name:</span>
                    <span style={{ marginRight: "20px" }}>{h.name}</span>
                    <span style={{ marginRight: "20px" }}>id:</span>
                    <span>{h._id}</span>
                  </li>
                );
              })}
          </li>
        </ul>
      </div>
    );
  };
  const showAlert = (msg) => {
    return <Alert variant="success">{msg}</Alert>;
  };
  const onChangeHandler = (event) => {
    setSelectFile(event.target.files[0]);
  };
  const onClickHandler = () => {
    console.log(selectedFile, "s");
    const data = new FormData();
    data.append("profileImg", selectedFile);
    data.append("id", _id);
    data.append("secret", text);
    console.log(data, "data");
    axios
      .post(`http://localhost:8000/users/upload/${_id}`, data, {
        // receive two parameter endpoint url ,form data
      })
      .then((res) => {
        // then print response status
        if (res.data.success === true) {
            setshowsuc(true);
        }
      });
  };
  const inputChange = (e) => {
    setText(e.target.value);
  };
  const uploadFile = () => {
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <input type="file" name="file" onChange={onChangeHandler} />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <span style={{ marginRight: "10px" }}>secret :</span>
          <input
            type="password"
            name="text"
            placeholder="add secret"
            onChange={inputChange}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
          block
        >
          <Button variant="success" size="lg" onClick={onClickHandler}>
            Upload
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Layout
      title="Upload Documents"
      description={`Hello, ${name}!`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-3">{userLinks()}</div>
        <div className="col-9">
            {showsuc && showAlert("Added to the blockchain")}
            {uploadFile()}
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
