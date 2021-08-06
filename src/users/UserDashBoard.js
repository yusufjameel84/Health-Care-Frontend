import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth/index";
import { Link, Redirect } from "react-router-dom";
import { getDoctors, updateDoc } from "./apis";
import moment from "moment";
import InputGroup from "react-bootstrap/InputGroup";
import FormGroup from "react-bootstrap/FormGroup";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import axios from "axios";
import { Alert } from "react-bootstrap";
import ChatBot from "../chatBot/ChatBot";
import { StarOutlined, StarFilled, StarTwoTone } from "@ant-design/icons";
import { Table, Image } from 'react-bootstrap';
import { AiOutlineStar } from 'react-icons/ai';
import StarRatings from 'react-star-ratings';


const UserDashboard = () => {
  const [history, setHistory] = useState([]);
  const [doc, setDoc] = useState([]);
  const [showsuc, setshowsuc] = useState(false);
  const [rating, setRating] = useState(0);
  const {
    user: { _id, name, email, role },
    token,
  } = isAuthenticated();

  const loadPurchaseHistory = () => {
    getDoctors()
      .then((data) => {
        if (data.success === false) {
          // Show error
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

  const showAlert = (msg) => {
    return <Alert variant="success">{msg}</Alert>;
  };

  const userLinks = () => {
    return (
      <div className="card">
        <h3 className="card-header">User Links</h3>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/patient/dashboard">
              upload documents
            </Link>
          </li>
          <li className="list-group-item">
            <a
              className="nav-link"
              href={`https://sheltered-fjord-94062.herokuapp.com/`}
            >
              Online Video Chat Link
            </a>
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
        </ul>
      </div>
    );
  };
  const provideAccess = () => {
    axios
      .post(
        `http://localhost:8000/access`,
        { doctors: doc, id: _id },
        {
          // receive two parameter endpoint url ,form data
        }
      )
      .then((res) => {
        // then print response status
        if (res.data.success === true) {
          setshowsuc(true);
        }
      });
  };
  const addAccess = (id, e) => {
    let dc = doc;
    if (e.target.checked) {
      let k = dc.indexOf(id); // -1
      if (k === -1) {
        dc.push(id);
        setDoc(dc);
      }
    } else {
      let p = [];
      for (let i = 0; i < doc.length; i++) {
        if (doc[i] !== id) {
          p.push(doc[i]);
        }
      }
      setDoc(p);
    }
  };

 const changeRating = (id, e) => {
   setRating(e)
  console.log(e, "change")
   const object = {
     id: id,
     rating: e
   }
    updateDoc(object).then((res)=>{
      if(res.success === true) {
        setshowsuc(true)
      }
    }).catch((err)=>{
      console.log(err)
    })
  }

  const purchaseHistory = (history) => {
    return (
      <Form>
        <h2>All Available Doctors</h2>
        <Table striped bordered hover>
        <thead>
                <tr>
                <th>#</th>
                <th>Name</th>
                <th>id</th>
                <th>Description</th>
                <th>Review</th>
                <th>Add Approval</th>
                </tr>
            </thead>
            <tbody>
                {history && history.length > 0 && history.map((r, i)=>(
                    <tr key={i}>
                        <td>{i}</td>
                        <td>{r.name}</td>
                        <td>{r._id}</td>
                        <td style={{width: '200px'}}>{r.description}</td>
                        <td><StarRatings rating={r.rating} changeRating={(e)=>{changeRating(r._id, e)}} name='rating' starRatedColor="blue"starDimension="30px"></StarRatings></td>
                        <td><Form.Check onClick={(e)=>{addAccess(r._id, e)}} label="Add Doctor"></Form.Check></td>
                    </tr>
                ))}
            </tbody>
        </Table>
      </Form>
    );
  };

  return (
    <Layout
      title="Dashboard"
      description={`Hello, ${name}!`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-3">{userLinks()}</div>
        <div className="col-9">
          {showsuc && showAlert("Doctors Updated")}

          {userInfo()}
          {purchaseHistory(history)}
          <Button style={{ marginBottom: "10px" }} onClick={provideAccess}>
            Provide Access
          </Button>
          {ChatBot()}
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
