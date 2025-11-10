module.exports = {
  apps: [
    {
      name: "react-router-app",
      script: "./build/server/index.js",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 3030,
      },
      // Optional: Enable cluster mode for better performance
      // instances: "max",
      // exec_mode: "cluster",

      // Error handling
      max_restarts: 10,
      min_uptime: "10s",

      // Logging
      error_file: "./logs/pm2-error.log",
      out_file: "./logs/pm2-out.log",
      merge_logs: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
    },
  ],
};