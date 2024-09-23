// models/ShoppingItem.js
const db = require("../config/db");

const ShoppingItem = {
  getAllItems: (callback) => {
    const query = "SELECT * FROM items";
    db.query(query, callback);
  },

  addItem: (item, callback) => {
    const query = "INSERT INTO items (name, quantity, price) VALUES (?, ?, ?)";
    db.query(query, [item.name, item.quantity, item.price], callback);
  },

  deleteItem: (id, callback) => {
    const query = "DELETE FROM items WHERE id = ?";
    db.query(query, [id], callback);
  },
};

module.exports = ShoppingItem;
