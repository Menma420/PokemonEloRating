const express = require('express');
const db = require('./models');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const pokemonRouter = require("./Routes/Pokemon");
app.use("/", pokemonRouter);

db.sequelize.sync().then(() => {
    app.listen(4000, () =>{
        console.log('Server is running on port 4000');
    });
});
