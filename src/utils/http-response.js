// const logger = require('../config/logger');

// /* create response-wrapper object */
// functions.createResponseObject = ({
//   req,
//   result = 0,
//   message = '',
//   payload = {},
//   logPayload = false,
// }) => {
//   let payload2log = {};
//   if (logPayload) {
//     payload2log = { ...payload };
//   }

//   let messageToLog = `RES [${req.requestId}] [${req.method}] ${req.originalUrl}`;
//   messageToLog +=
//     (!_.isEmpty(message) ? `\n${message}` : '') +
//     (!_.isEmpty(payload) && logPayload
//       ? `\npayload: ${JSON.stringify(payload2log, null, 4)}`
//       : '');

//   if (result < 0 && (result !== -50 || result !== -51)) {
//     logger.error(messageToLog);
//   } else if (!_.isEmpty(messageToLog)) {
//     logger.info(messageToLog);
//   }

//   return { result, message, payload };
// };

// module.exports = exports = functions;
