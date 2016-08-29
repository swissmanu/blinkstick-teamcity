const teamCity = require('./teamCity')
const blinkstick = require('./blinkStick')
const checker = require('./checker')

module.exports = (config) => {
  Object.assign({}, config, { sources: config.sources.slice(0).sort((a, b) => a.priority - b.priority) })

  const configuredChecker = checker(teamCity(config), blinkstick(config))
  const run = () => {
    setTimeout(() => {
      check().then(run)
    }, config.server.pollInterval)
  }
  const check = () => {
    return configuredChecker()
      .catch((e) => {
        console.log('Error:', e)
      })
  }

  check().then(run)
}
