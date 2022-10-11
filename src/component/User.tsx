import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { orderBy } from "lodash";

export default function User() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [data, setData] = useState([]);

  async function fetchData() {
    try {
      const { status, data } = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      if (status === 200) {
        setData(data);
      }
    } catch (ex) {}
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleSortedByName = () => {
    const tempArr = [...data];
    const res = orderBy(tempArr, "name", ["asc"]);
    setData(res);
  };

  const handleSortedByCompany = () => {
    const tempArr = [...data];
    const res = orderBy(tempArr, "company.name", ["asc", "dsc"]);
    setData(res);
  };
  return (
    <>
      <h1>Users</h1>
      <span>
        <button onClick={handleSortedByName}> Sorted By Name</button>
        <button onClick={handleSortedByCompany}> Sorted By Company</button>
      </span>
      <table style={{ border: "1px solid black" }}>
        <thead>
          <tr>
            <th>Select</th>
            <th>Name</th>
            <th>Website</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((d) => (
              <tr key={d.id} className={selected === d.id ? "selected" : ""}>
                <td>
                  {" "}
                  <input
                    type="checkbox"
                    checked={d.id === selected}
                    onChange={(e) => setSelected(d.id)}
                  />
                </td>
                <td
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/${d.id}`)}
                >
                  {d.name}
                </td>
                <td>{d.website}</td>
                <td>{d.company.name}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
