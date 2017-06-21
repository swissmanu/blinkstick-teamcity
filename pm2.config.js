module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [{
    name: "blinkstick-teamcity",
    script: "index.js",
    env_production: {
      NODE_ENV: "production"
    }
  }]
}
