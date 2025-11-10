module.exports = {
  apps: [
    {
      name: "nextjs-app",
      script: "node",
      args: "server.js",
      // instances: "max", // Utilize all available CPUs
      // exec_mode: "cluster", // Enable cluster mode
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};