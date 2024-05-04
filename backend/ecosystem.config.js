module.exports = {
  apps: [
    {
      name: "API",
      script: "./bin/www/index.js",
      watch: true,
      ignore_watch: ["node_modules"],
      exec_mode: "cluster",
      instances: "max",
      autorestart: true,
      max_memory_restart: "1G",
    },
  ],
};
