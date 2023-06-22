module.exports = {
    apps: [
        {
            name: "frontend",
            script: "npm",
            args: "run dev",
            cwd: "./",
            watch: true,
            env: {
                NODE_ENV: "production"
            }
        },

        {
            name: "backend",
            script: "node",
            args: "dist/server.js",
            cwd: "backend/",
            watch: true,
            env: {
                NODE_ENV: "production"
            }
        }
    ]
} 
