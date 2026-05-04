import React from "react";

const ItemCard = ({ item, type, isSelected, onSelect, onDelete }) => {
  if (type === "person") {
    return (
      <li
        onClick={onSelect}
        className={`person-card ${isSelected ? "selected" : ""}`}
        style={{ cursor: "pointer" }}
      >
        <div className="person-info">
          <p>{item.name}</p>
          {item.languages && item.languages.length > 0 && (
            <p>{item.languages.join(", ")}</p>
          )}
        </div>
        <button
          onClick={(event) => {
            event.stopPropagation();
            onDelete();
          }}
          className="icon-button delete"
        >
          ×
        </button>
      </li>
    );
  }

  if (type === "language") {
    return (
      <div className="language-item">
        <span>{item.language}</span>
        <button onClick={onDelete} className="icon-button delete">
          ×
        </button>
      </div>
    );
  }

  return null;
};

export default ItemCard;
