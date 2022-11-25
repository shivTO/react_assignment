import React, { useState, useEffect,useMemo } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles.css";
import axios from "axios";
import Pagination from './Pagination';
import SearchForm from "./SearchForm";

import Login from "./Login";
import Register from "./register";
import GifList from "./GifList";
let PageSize = 8;
function App() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("webdeveloper");
  const [isloading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage,data]);
  const performSearch = (value) => setQuery(value);
  // fetching data from giphy api
  useEffect(() => {
    axios(
      `https://api.giphy.com/v1/gifs/search?api_key=GlVGYHkr3WSBnllca54iNt0yFbjz7L65&q=${query}&limit=25&offset=0&rating=g&lang=en`
    )
      .then((res) => setData(res.data.data))
      .catch((error) => console.log("Error fetching and parsing data", error))
      .finally(() => setIsLoading(false));
  }, [query]);

  return (
    <>
    <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          </Routes>
      </Router>
      <div className="main-header">
        <div className="inner">
          <h1 className="main-title">GIF SEARCH</h1>
          <SearchForm onSearch={performSearch} />
        </div>
      </div>
      <div className="main-content">
        {isloading ? <p>Loading...</p> : <GifList  data={currentTableData} />}
      </div>
      <Pagination 
        
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={data.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />
    </>
   
    
  );
}

export default App;
