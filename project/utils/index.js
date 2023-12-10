function buildResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
      "Access-Control-Allow-Headers": "Content-Type",
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  };
}

module.exports.buildResponse = buildResponse;