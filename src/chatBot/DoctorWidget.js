import React, {useState, useEffect} from 'react'
import { getDoctors } from "../users/apis";
import Dropdown from 'react-bootstrap/Dropdown'

const DoctorWidget = (props) => {
    
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setDoctorsData();
      }, []);

    const setDoctorsData = () => {
        getDoctors()
        .then((data) => {
            setLoading(false)
            if (data.success === false) {
                console.log("error");
            } else {
                setDoctors(data.doctors);
            }
        })
        .catch((err) => {
            setLoading(false)
            console.log(err);
        });
    }

    const truncate  = (str) => {
        return str.length > 10 ? str.substring(0, 7) + "..." : str;
    }

    return (
        <div>
            <ul className="list-group">
                    {doctors &&
                    doctors.length > 0 &&
                    doctors.map((h, i) => {
                        return (
                            <React.Fragment>
                                <li key={i} className="list-group-item">
                                    <span style={{ marginRight: "5px" }}>name:</span>
                                    <span style={{ marginRight: "5px", display: "inline-flex"}}>{truncate(h.name)}</span>
                                    <span style={{ marginRight: "5px" }}>id:</span>
                                    <span>{truncate(h._id)}</span>
                                    <span>
                                    </span>
                                </li>
                                { i+1 !== doctors.length ? <Dropdown.Divider /> : ""}
                            </React.Fragment>
                        );
                    })}
            </ul>
        </div>
    )
}

export default DoctorWidget
