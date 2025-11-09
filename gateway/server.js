require("dotenv").config();
const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

const PORT = process.env.PORT || 3000;
const ORDERS = process.env.ORDERS_URL;
const PRODUCTS = process.env.PRODUCTS_URL;
const JWT_SECRET = process.env.JWT_SECRET || "secret";

// Usuários falsos para testes
const users = [
  { username: "admin", password: "1234" },
  { username: "user", password: "abcd" },
];

// Login com verificação de usuário e senha
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

// Middleware de autenticação
function authenticate(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: "No token provided" });
  const token = auth.split(" ")[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

// Proxy para ORDERS
app.use("/orders", authenticate, async (req, res) => {
  try {
    const url = `${ORDERS}${req.path}`;
    const resp = await axios({
      method: req.method,
      url,
      headers: {
        "Content-Type": "application/json",
        Authorization: req.headers.authorization,
      },
      data: req.body,
    });
    res.status(resp.status).json(resp.data);
  } catch (err) {
    console.error("Error forwarding to orders:", err.message);
    res.status(err.response?.status || 500).json({ error: err.message });
  }
});

// Proxy para PRODUCTS
app.use("/products", authenticate, async (req, res) => {
  try {
    const url = `${PRODUCTS}${req.path}`;
    const resp = await axios({
      method: req.method,
      url,
      headers: {
        "Content-Type": "application/json",
        Authorization: req.headers.authorization,
      },
      data: req.body,
    });
    res.status(resp.status).json(resp.data);
  } catch (err) {
    console.error("Error forwarding to products:", err.message);
    res.status(err.response?.status || 500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Gateway running on port ${PORT}`));
