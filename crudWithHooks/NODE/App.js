const express = require("express");
const app = express();
const PORT = 8000
const routes = require("./routes");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use("/", routes);

app.use((error, req, res, next) =>
    res.json({
        success: false,
        error,
    })
);

app.listen(PORT, () => {
    console.log("Server started at PORT:" + PORT);
});



module.exports = app;
