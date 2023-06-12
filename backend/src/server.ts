import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PG_PORT;

//Start the server
app.listen(port, () => {
    console.log("Server now running on port ${port}");
});


