import React, { useState, useRef, useCallback, useEffect } from "react";
import useNewsSearch from "./useNewsSearch";
import { FaRegNewspaper, FaSearch } from "react-icons/fa";
import NewsData from "./NewsData";
import "./NewsApp.css";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export default function NewsApp() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [pageNumber, setPageNumber] = useState(1);
  const [isDisabled, setDisabled] = useState(true);
  const [searchValue, setSearchValue] = useState(searchParams.get("q") || "");
  const { news, hasMore, loading, error, fetchData, refreshMessage } =
    useNewsSearch(query, pageNumber);

  const observer = useRef();
  const lastNewsElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  function handleSearch(e) {
    const queryString = e.target.value;
    queryString.trim().length === 0 || searchValue === queryString
      ? setDisabled(true)
      : setDisabled(false);
    setQuery(queryString);
  }
  function handleSubmit(e) {
    e.preventDefault();
    setPageNumber(1);
    setSearchValue(query);
    setSearchParams({
      q: query,
    });
    setDisabled(true);
    fetchData();
  }

  return (
    <div className="newsApp">
      <div className="title">
        <h1>
          {/* <FaRegNewspaper className="logoIcon" color="#353b48" /> */}
          LATEST NEWS SEARCH
        </h1>
      </div>
      <div className="container">
        {/* <h5 className="refresh">
          Auto refresh in <span id="timer">30</span> seconds
        </h5> */}
        <form className="searchBox">
          <input
            id="searchFields"
            type="text"
            value={query}
            onChange={handleSearch}
          />
          <button id="submit" onClick={handleSubmit} disabled={isDisabled}>
            <FaSearch className="searchIcon" color="#353b48" />
          </button>
        </form>
        <h3 className="message"></h3>
        <div id="newsGrid">
          {news.map((item, index) => {
            if (news.length === index + 1) {
              return (
                <div ref={lastNewsElementRef}>
                  <NewsData key={index} items={item} />
                </div>
              );
            } else {
              return <NewsData key={index} items={item} />;
            }
          })}
        </div>
        <h3 className="message">
          {loading && (
            <div class="balls">
              <h1 class="ball"></h1>
              <h1 class="ball"></h1>
              <h1 class="ball"></h1>
            </div>
          )}
        </h3>
        <h3 className="message">{error && "No Result Found"}</h3>
        {/* <h3 className="message">{refreshMessage && "New Posts"}</h3> */}
      </div>
    </div>
  );
}
