var randomColor = require('randomcolor');
var hash = require('object-hash');


export const getAccountColour = (account) => {
  return randomColor({
    luminosity: 'dark',
    format: 'rgba',
    alpha: 0.5,
    seed: hash(account)
  });  
}

export const getRegionColour = (region) => {
  return randomColor({
    luminosity: 'dark',
    format: 'rgba',
    alpha: 0.5,
    seed: hash(region)
  });
}

export const getAZColour = (az) => {
  return randomColor({
    luminosity: 'dark',
    format: 'rgba',
    alpha: 0.5,
    seed: hash(az)
  });
}