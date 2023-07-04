import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import imgCarouselSchema from './schema';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import resolver from './resolver';
import pictureRoute from './routes/picturesRoute';
import sequelize from './sequelize';
import cors from 'cors';

dotenv.config();

//Configuring backend
const app = express();
const port = parseInt(process.env.SERVER_PORT as string, 10);

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

export const dbPool = pool;

//Enable CORS for the frontend client only
app.use(cors({
    origin: 'https://client-hosts-ordinary-rental.trycloudflare.com'
}));

//Defining the routes for GraphQL requests
app.use('/graphql', async (req, res) => {
    try {
        return await graphqlHTTP({
            schema: imgCarouselSchema,
            rootValue: resolver,
            graphiql: true
        })(req, res);
    } catch (error) {
        console.error("GraphQL error: ", error);
    }
});

//Defining the routes for HTTP API requests
app.use('/api', pictureRoute);

//Start the server and listen for incoming requests
sequelize.sync().then(() => {
    app.listen(port || process.env.SERVER_PORT, () => {
        testDBconnection();
        console.log("Server is running on http://localhost:"+port+"/graphql");
        console.log("Server is also running on http://localhost:"+port+"/api");
    });
})
