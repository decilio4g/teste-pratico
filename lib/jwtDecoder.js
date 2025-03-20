"use strict";
module.exports = (body, secret, cb) => {
const jwt = require("jsonwebtoken");

  if (!body) {
    return cb(new Error("invalid jwtdata"));
  }
  try {
    const body2 = jwt.verify(
      body.toString("utf8"),
      secret,
      {
        algorithm: "HS256",
      },
      cb
    );

		return body2
  } catch(err) {

		console.error(err)
    return cb(new Error("invalid dasdadsa"));
  }
};
