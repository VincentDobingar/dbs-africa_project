const crypto = require("crypto");

const generatePartnerCode = () => {
  const year = new Date().getFullYear();

  const randomCode = crypto
    .randomBytes(4)
    .toString("hex")
    .toUpperCase();

  return `DBS-PAR-${year}-${randomCode}`;
};

module.exports = {
  generatePartnerCode,
};