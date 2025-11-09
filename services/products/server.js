const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

let products = [
  { id: 1, name: "Laptop", price: 5000 },
  { id: 2, name: "Mouse", price: 150 },
  { id: 3, name: "Teclado Mecânico", price: 350 },
  { id: 4, name: 'Monitor 24"', price: 900 },
  { id: 5, name: "Headset Gamer", price: 400 },
  { id: 6, name: "Cadeira Gamer", price: 1200 },
  { id: 7, name: "Microfone USB", price: 250 },
  { id: 8, name: "Webcam Full HD", price: 300 },
  { id: 9, name: "HD Externo 1TB", price: 500 },
  { id: 10, name: "Notebook", price: 4500 },
  { id: 11, name: "SSD 512GB", price: 600 },
  { id: 12, name: "Placa de Vídeo RTX 4060", price: 2500 },
  { id: 13, name: "Fonte 650W", price: 400 },
  { id: 14, name: "Gabinete com RGB", price: 350 },
  { id: 15, name: "Mousepad Grande", price: 100 },
];

app.get("/products/list", (req, res) => res.json(products));

app.post("/products/create", (req, res) => {
  const newProduct = { id: products.length + 1, ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.put("/products/update/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return res.status(404).json({ error: "Product not found" });
  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
});

app.delete("/products/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  products = products.filter((p) => p.id !== id);
  res.status(204).end();
});

app.listen(5000, () => console.log("Products service running on port 5000"));
