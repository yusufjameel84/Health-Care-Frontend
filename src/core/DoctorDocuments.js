import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import {Link, Redirect} from 'react-router-dom'
import {signin, authenticate, isAuthenticated, getSecret} from '../auth/index';
import  Chat  from "../chatBot/ChatBot";
import { getPatients } from "../users/apis";
import { Table, Image } from 'react-bootstrap';
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

const DoctorDocuments = () => {
    const [history, setHistory] = useState([]);
    const [showsuc, setshowsuc] = useState(false);
    const [values,
        setValues] = useState({doctorid: "", patientid: "", secret: "", documentid: "", showSecret: false, error: '', showError: false, showTable: false, patient: {}, img: '', showImage: false});


    const {
        user: { _id, name, email, role },
        token,
      } = isAuthenticated();

    const loadPurchaseHistory = () => {
        getPatients(_id).then((data) => {
            if (data.success === true) {
                setHistory(data.patients);
                setshowsuc(true)
            }
        }).catch((err) => {
            console.log(err);
        })
    };

    const handleChange = key => event => {
        setValues({
            ...values,
            error: false,
            [key]: event.target.value
        });
    }

    useEffect(() => {
        setValues({...values, doctorid: _id})
        loadPurchaseHistory();
    }, []);

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({
            ...values,
            error: false,
        });

        getSecret(values).then(data=>{
            if (data === undefined) {
                // Show Error
                setValues({
                    ...values,
                    error: 'Sorry Patient Data is not found',
                    showError: true,
                    showTable: false
                })
            }
            else if(data.success === false) {
                // SHOW ERROR
                setValues({
                    ...values,
                    error: data.message,
                    showTable: false,
                    showError: true,
                })
            } else {
                setValues({
                    ...values,
                    patient: data.patient,
                    showError: false,
                    showTable: true,
                    showSecret: true
                })
            }
        })
    }

    const showErrors = () => (
        <div
            className="alert alert-danger"
            >
            {values.error}
        </div>
    )



    const patientForm = () => (
        <form>
            <div className="form-group">
                 <label className="text-muted">Secret Password</label>
                 <input onChange = {handleChange("secret")} className="form-control" type="password"></input>
            </div>
            <div className="form-group">
                <label className="text-muted">Patients</label>
                    <select onChange={handleChange("patientid")} className="form-control">
                        <option>Select any one patient</option>
                            {history &&
                                history.map((r, i) => (
                                <option key={i} value={r.id}>
                                    {r.name}
                                </option>
                            ))}
                    </select>
             </div>
            <button onClick={clickSubmit} style={{marginBottom: '30px'}}className="btn btn-primary">Submit</button>
        </form>
    )

    const showSecretF = () => (
        <div>
            <h3>{values.showSecret}</h3>
        </div>
    )

    const removeError = () => {

        if (values.showError) {
            setTimeout((setValues({...values, showError: false})), 5000)
        }
    }

    const showTable = () => {

        if(values.patient == null) return ""

        let documents = values.patient.documents
        return (<Table striped bordered hover>
            <thead>
                <tr>
                <th>#</th>
                <th>Name</th>
                <th>id</th>
                <th>Secret</th>
                <th>Report</th>
                </tr>
            </thead>
            <tbody>
                {documents && documents.length > 0 && documents.map((r, i)=>(
                    <tr key={i}>
                        <td>{i}</td>
                        <td>{values.patient.name}</td>
                        <td>{values.patient.id}</td>
                        <td>{r.secret}</td>
                        <td><button className="btn btn-secondary" onClick={() => (showImage(r))}>Patient Report</button></td>
                    </tr>
                ))}
            </tbody>
        </Table>)
    }

    const showImage = (data) => {
        var base64Flag = 'data:image/jpeg;base64,';
        var imageStr = arrayBufferToBase64(data.image.data);
        setValues({
            ...values,
            showImage: true,
            img: base64Flag + data.image.data
        })
    }

    const title = () => (
        <div>
            <h2>Patient Document Form</h2>
        </div>
    )

    const showImageNow = () => {
        return(
           <Container>
               <Row style={{'justifyContent': 'center'}}>
                   <h2>Patient Report</h2>
               </Row>
               <Row style={{'justifyContent': 'center'}}>
                   <Image src={values.img} style={{width: '500px'}}/>
               </Row>
           </Container>)
    }

    const arrayBufferToBase64 = (buffer) => {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    return (
        <Layout
            title="Patient Document Center"
            description="Find the Documents Here!!!"
            className="container col-md-8 offset-md-2">
            {title()}
            {values.showError && showErrors()}
            {patientForm()}
            {values.showSecret && showSecretF()}
            {values.showTable && showTable()}
            {values.showImage && showImageNow()}
        </Layout>
    )
}

export default DoctorDocuments
