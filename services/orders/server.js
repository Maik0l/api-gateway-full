const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

let orders = [
  { id: 1, product: "Laptop", quantity: 2 },
  { id: 2, product: "Mouse", quantity: 5 },
  { id: 3, product: "Teclado", quantity: 3 },
  { id: 4, product: "Monitor", quantity: 1 },
  { id: 5, product: "Headset", quantity: 4 },
  { id: 6, product: "Cadeira Gamer", quantity: 1 },
  { id: 7, product: "Microfone", quantity: 2 },
  { id: 8, product: "Webcam", quantity: 1 },
  { id: 9, product: "HD Externo", quantity: 3 },
  { id: 10, product: "Notebook", quantity: 2 },
];

app.get("/orders/list", (req, res) => res.json(orders));

app.post("/orders/create", (req, res) => {
  const newOrder = { id: orders.length + 1, ...req.body };
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

app.put("/orders/update/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = orders.findIndex((o) => o.id === id);
  if (index === -1) return res.status(404).json({ error: "Order not found" });
  orders[index] = { ...orders[index], ...req.body };
  res.json(orders[index]);
});

app.delete("/orders/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  orders = orders.filter((o) => o.id !== id);
  res.status(204).end();
});

app.listen(4000, () => console.log("Orders service running on port 4000"));
