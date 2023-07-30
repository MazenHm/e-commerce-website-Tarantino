const express = require("express");
const path = require("path");
const userCtrl = require("./controllers/UserController");
const productCtrl = require("./controllers/ProductController");
const app = express();
const cors = require("cors");
app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "50mb" }));
// app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

require("./config/database");

const PORT = 8080;

require("./routers")(app);

app.use(express.static(path.join("public")));

app.listen(PORT, () => console.log(`App listen on http://localhost:${PORT}`));
