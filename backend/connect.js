const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    ssl: false
});

//Establishing connection to the database using the Pool object from pg package
(async () => {

    try {

        //connecting to the database
        await pool.connect((error, client, release) => {

            if(error) {
                console.error("Error connecting to the database", error.stack)
                return;
            }
            else{
                console.log("Connected to the database")
            }

            client.query("SELECT current_database(), current_user", (error, result) => {
                release(); //release te client back to the pool

                if(error) {
                    console.log("Error executing query", error.stack);
                    return;
                }

                const { rows } = result;

                //Displaying the connection information
                console.log("Current database : ", rows[0].current_database);
                console.log("Current user : ", rows[0].current_user);
            })
        });
    }
    catch(error) {
        console.log(error);
    }

})();

(async () => {
    await pool.connect((error, client, release) => {

        if(error) {
            console.error("Error connecting to the database", error.stack)
            return;
        }
        else{
            console.log("Connected to the database")
        }
    
        client.query("SELECT * FROM store", (error, result) => {
            release(); //release te client back to the pool
    
            if(error) {
                console.log("Error executing query", error.stack);
                return;
            }
    
            const { rows } = result;
    
            //Displaying the connection information
            console.log(rows[0].current_database);
            console.log(rows[0].current_user);
        })
    });
    
    await pool.end();
})();