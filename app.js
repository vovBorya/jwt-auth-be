const express = require("express"),
    cors = require("cors"),
    router = express.Router(),
    dotenv = require("dotenv");
    // bodyParser = require("body-parser");

dotenv.config();

const db = require("./db/db");

const authController = require("./controllers/auth.controller");
const userController = require("./controllers/user.controller");
const verifySignUp = require("./middlewares/verifySignUp");

const port = process.env.PORT || 8080;

const app = express();

app.use(cors({ origin: `http://localhost:${port}` }));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync();

// app.post("/api/sign-in", signIn);
// app.post("/api/sign-up", signUp);

app.use(function(req, res, next) {
  res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

app.post(
    "/api/sign-up",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      // verifySignUp.checkRolesExisted
    ],
    authController.signUp
);

app.post("/api/sign-in", authController.signIn);

// app.get("/api/users", userController.findAll);

userController(app);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
