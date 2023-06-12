import express, { Request, Response } from 'express';
import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 3000;

//Start the server
app.listen(port, () => {
    console.log("Server now running on port " + port);
});

//Configuring connection to the PostgreSQL database connection
const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT as string, 10)
});

//Ensure that the database has been connected to
async function testDBconnection() {

    try {
        //create a client from the pool
        const client = await pool.connect();

        //Sending a simple query to get the current time from the database
        const results = await client.query("SELECT NOW()");

        console.log("Sucessfully connected to database: " + process.env.POSTGRES_DATABASE + "\nCurrent database time:",results.rows[0]);

        client.release();
    }
    catch(error) {
        console.error("An error was encountered while connecting to the database",error);
    }
    
}

testDBconnection();
