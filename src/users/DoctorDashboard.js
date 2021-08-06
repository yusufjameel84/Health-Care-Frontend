import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth/index";
import { Link } from "react-router-dom";
import { getPatients } from "./apis";
import { Table, Image } from 'react-bootstrap';

const DoctorDashboard = () => {
  const [history, setHistory] = useState([]);
  const {
    user: { _id, name, email, role },
    token,
  } = isAuthenticated();
  const [showsuc, setshowsuc] = useState(false);
  const loadPurchaseHistory = () => {
    getPatients(_id).then((data)=>{
      if(data.success === true) {
        setHistory(data.patients);
        setshowsuc(true)
      }
    }).catch((err)=>{
      console.log(err);
    })
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
            <Link className="nav-link" to="/doctor/doc">
              SEE documents
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

  const purchaseHistory = (history) => {
    return (
      <React.Fragment>
        <h2>All Patients That Provided Access</h2>
        <Table striped bordered hover responsive="sm">
        <thead>
                <tr>
                <th>#</th>
                <th>Name</th>
                <th>id</th>
                </tr>
            </thead>
            <tbody>
                {history && history.length > 0 && history.map((r, i)=>(
                    <tr key={i}>
                        <td>{i}</td>
                        <td>{r.name}</td>
                        <td>{r._id}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
      </React.Fragment>
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
          {userInfo()}
          {showsuc && purchaseHistory(history)}
          {/* {Chat()} */}
        </div>
      </div>
    </Layout>
  );
};

export default DoctorDashboard;
