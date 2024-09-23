// controllers/shoppingController.js
const ShoppingItem = require("../models/ShoppingItem");

exports.getItems = (req, res) => {
  ShoppingItem.getAllItems((err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
};

exports.addItem = (req, res) => {
  const { name, quantity, price } = req.body;
  const newItem = { name, quantity, price };

  ShoppingItem.addItem(newItem, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(201).json({ id: result.insertId, ...newItem });
  });
};

exports.deleteItem = (req, res) => {
  const { id } = req.params;

  ShoppingItem.deleteItem(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json({ message: "Item deleted" });
  });
};
