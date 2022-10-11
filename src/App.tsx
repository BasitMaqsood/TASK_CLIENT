import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Users from "./component/User";
import UserDetails from "./component/UserDetails";
import "./styles.css";

// Write a page that will retrieve data from https://jsonplaceholder.typicode.com/users

// Output that data into a table which includes Name, website (as a link), and company name.

// When clicking on the name bring up a window that displays the entire record

// Make each row have a checkbox and have that checkbox highlight that row

// Make sortable by Name and company name

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/:id" element={<UserDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
