
const serviceIconMap = {
  'search': 'search'
};

const icons = new Map();

for (let [key, value] of Object.entries(serviceIconMap)) {
  icons.set(value, key)
}

export const fetchImage = (type, state) => { 
  let image;

  if (state && type) {
    image = icons.get(`${type}-${state.status}`)
  } else if (state && !type) {
    image = icons.get(state.status)
  } else if( !state && type) {    
    image = icons.get(type)
  } else {
    return undefined
  }

  return image ? buildURL(image) : undefined
};

const buildURL = (image) => {
  return `${process.env.PUBLIC_URL}/icons/${image}.svg`;
}

export const fetchLogo = transparent => {
  return transparent ? `${process.env.PUBLIC_URL}/icons/${icons.get('logo-transparent')}.svg` : `${process.env.PUBLIC_URL}/icons/${icons.get('logo')}.svg`;
};
