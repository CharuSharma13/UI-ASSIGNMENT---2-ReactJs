import React from "react";
import "./NewsApp.css";
import ReplacementImage from "./altImg.jpg";

export default function NewsData({ items }) {
  return (
    <div className="newsDetails">
      <img
        className="newsImage"
        // src={items.urlToImage !== "" ? items.urlToImage : "altImg.jpg"}
        src={items.media !== "" ? items.media : "altImg.jpg"}
        onError={(e) => {
          e.target.src = ReplacementImage;
        }}
      />
      <div className="newsContent">
        <h3 className="newsTitle">{items.title !== null ? items.title : ""}</h3>
        <h5 className="newsAuthor">
          {items.author != "" ? "Author Name: " + items.author : ""}
        </h5>
        <p className="newsDescription">
          {/* {items.description !== null ? items.description : ""} */}
          {items.summary !== "" ? items.summary : ""}
          {/* <a className="readMore" href={items.url}> */}
          <a className="readMore" href={items.link}>
            read more
          </a>
        </p>
      </div>
    </div>
  );
}
