const settings    = require("../config");
const speakeasy   = require("speakeasy");

const testAuthenticationOTP = async (otpCode, silent) => {
  const verifyObj = {
    secret: settings.OTPsecret,
    encoding: "base32",
    token: otpCode.replace(/ /g, "")
  };

  if (await speakeasy.totp.verify(verifyObj)) {
    return true;
  }
  return false;
};

exports.testAuthenticationOTP = testAuthenticationOTP;
