const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const productsRouter = require('./router/products');
const transactionsRouter = require('./router/transactions');

const cors = require('cors');

const options = {
    origin: `https://localhost:3000`,
}

app.use(cors(options));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.get('/', (req, res) => {
    res.json({
        message: "ok"
    })
})

app.use(bodyParser.json());
app.use("/products", productsRouter);
app.use("/transcations", transactionsRouter);


app.listen(port, () => {
    console.log(`Example app listening at https://localhost:${port}`);
})