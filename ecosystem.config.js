module.exports = {
    apps: [
        {
            name: "frontend",
            script: "npm run dev",
            cwd: "web/frontend",
            watch: true,
            env: {
                NODE_ENV: "production"
            }
        },

        {
            name: "backend",
            script: "npm start",
            cwd: "backend/",
            watch: true,
            env: {
                NODE_ENV: "production"
            }
        }
    ]
} 
