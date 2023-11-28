import React, { useEffect, useState } from "react";
import "./app.css";

export default function App() {
  const [users, setUsers] = useState([]);

  // these state are for new users
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // when this state is set to true, api request will be made to fetch users
  const [shouldFetchData, setShouldFetchData] = useState(true);

  useState(() => {});

  /*
    code inside this useEffect runs whenever the value of `shouldFetchData` changes.
    Inside this useEffect, I have written code that fetches the api endpoint to get users data.
    It then saves the response from that enpoint in the `users` state variable.
  */
  useEffect(() => {
    if (!shouldFetchData) return;
    fetch(process.env.REACT_APP_API_URL, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        console.log("SOMETHING WENT WRONG!!! ", err);
      })
      .finally(() => {
        setShouldFetchData(false);
      });
  }, [shouldFetchData]);

  /*
    This is a basic from submit event hander.
    This just makes the api call to create a new user.
  */
  const onFormSubmit = (event) => {
    event.preventDefault();
    fetch(process.env.REACT_APP_API_URL, {
      method: "POST",
      body: JSON.stringify({
        name: name,
        phone_number: phoneNumber,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(() => {
      setName("");
      setPhoneNumber("");
      setShouldFetchData(true);
    });
  };

  return (
    <div className="app">
      {/* FORM */}
      <form onSubmit={onFormSubmit} className="form">
        <label>
          Name:
          <br />
          <input
            type="text"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label>
          Phone Number:
          <br />
          <input
            type="number"
            name="phone-number"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
        </label>
        <input type="submit" value="Submit" class="submit-button" />
      </form>

      {/* TABLE */}
      <table class="table">
        <tr>
          <th>Name</th>
          <th>Phone Number</th>
        </tr>
        {users.map((user) => (
          <tr>
            <td>{user.name}</td>
            <td>{user.phone_number}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}


/*
    author: Samman Adhikari
    date: 26.11.2023
*/