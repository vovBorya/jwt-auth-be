const express = require("express"),
    cors = require("cors"),
    router = express.Router(),
    dotenv = require("dotenv");
    // bodyParser = require("body-parser");

dotenv.config();

const db = require("./db/db");

const { signIn, signUp } = require("./controllers/auth.controller");
const userController = require("./controllers/user.controller");

const port = process.env.PORT || 8080;

const app = express();

app.use(cors({ origin: `http://localhost:${port}` }));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync();

app.post("/api/sign-in", signIn);
app.post("/api/sign-up", signUp);

app.get("/api/users", userController.findAll)

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
