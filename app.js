const express = require("express");

const app = express();

const PORT = process.env.PORT || 80;

app.get("/", (req, res) => {
    res.send("GitHub Actions Capstone");
});

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "UP"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;