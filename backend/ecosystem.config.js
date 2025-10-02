module.exports = {
  apps: [
    {
      name: 'record-repo-backend',
      script: 'dist/main.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 5050,
      },
      env_development: {
        NODE_ENV: 'development',
        PORT: 5050,
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true,
    },
  ],
};
