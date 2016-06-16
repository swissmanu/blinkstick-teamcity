const fs = require('fs')
const request = require('request')
const https = require('https')
const Status = require('./status')

module.exports = (config) => {
  return () => {
    if (config.server.cert) {
      try {
        const clientCertificate = fs.readFileSync(config.server.cert)
        https.globalAgent.options.pfx = clientCertificate
      } catch (e) {
        return Promise.reject(e)
      }
    }

    return Promise.all(config.buildLocators.map((l) => getBuildStatusForLocator(config.server.url, config.server.user, config.server.password, l)))
  }
}

function getBuildStatusForLocator (url, user, password, locator) {
  return new Promise(function (resolve, reject) {
    request.get({
      url: url + '/httpAuth/app/rest/builds/',
      qs: { locator: locator.locator },
      headers: { accept: 'application/json' },
      auth: { user, password }
    }, function (err, res, body) {
      if (!err && res.statusCode === 200) {
        resolve({
          name: locator.name,
          status: convertResponseBodyToStatus(JSON.parse(body))
        })
      } else {
        reject({
          name: locator.name,
          status: Status.CONNECTION_FAILED,
          err: err
        })
      }
    })
  })
}

function convertResponseBodyToStatus (body) {
  switch (body.build[0].status) {
    case 'SUCCESS':
      return Status.BUILD_OK
    default:
      return Status.BUILD_FAILED
  }
}
