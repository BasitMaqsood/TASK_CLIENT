import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function User() {
  const navigate = useNavigate();
  const params = useParams();

  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);

  async function fetchData() {
    try {
      const { status, data } = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${params.id}`
      );
      if (status === 200) {
        setData(data);
        setLoader(false);
      }
    } catch (ex) {}
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (loader) return <p> Loading ...</p>;

  return (
    <>
      <button onClick={() => navigate("/")}> Go Back</button>
      <h1>Users</h1>
      <table style={{ border: "1px solid black" }}>
        <thead>
          <tr>
            {Object.keys(data)
              .filter((d) => {
                if (d != "address" && d != "company") {
                  return d;
                }
              })
              .map((d) => {
                return <th>{d.toUpperCase()}</th>;
              })}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td> {data.id} </td>
            <td> {data.name} </td>
            <td> {data.username} </td>
            <td> {data.email} </td>
            <td> {data.phone} </td>
            <td>{data.website}</td>
          </tr>
        </tbody>
      </table>
      <table style={{ border: "1px solid black" }}>
        <tbody>
          <tr>
            <td>Address: </td>
            <td>
              {`Street: ${data.address.street}, Suite: ${data.address.suite} City: ${data.address.city} Zipcode: ${data.address.zipcode} Geo: Lat - ${data.address.geo.lat} Lng- ${data.address.geo.lng}`}
            </td>
          </tr>
          <tr>
            <td>Company: </td>
            <td>
              {`Name: ${data.company.name}, Catch Phrase: ${data.company.catchPhrase}, BS: ${data.company.bs}`}{" "}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
