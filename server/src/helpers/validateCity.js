const cityRegex = /^[\p{L}\s\-']+$/u;


function validateCity(name) {
  return cityRegex.test(name);
}

module.exports = validateCity;