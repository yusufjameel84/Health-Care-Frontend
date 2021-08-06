const API = "http://localhost:8000";

export const getDoctors = () => {
    // console.log(name," ", email, " ", password);
    return fetch(`${API}/doctors`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log(err);
    });
};
export const getPatients = (id) => {
    // console.log(name," ", email, " ", password);
    return fetch(`${API}/patients/${id}`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log(err);
    });
};

export const updateDoc = (data) => {
    return fetch(`${API}/updatedoctor`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log(err);
    });
}