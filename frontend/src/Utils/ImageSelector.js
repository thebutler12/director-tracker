const images = {
  search: 'search',
  tapes: 'tapes'
};

const icons = new Map();

for (let [key, value] of Object.entries(images)) {
  icons.set(value, key);
}

export const fetchImage = (name) => {
  console.dir(name)
  console.dir(buildURL(icons.get(name)))
  return buildURL(icons.get(name));
};

const buildURL = (image) => {
  return `${process.env.PUBLIC_URL}/images/${image}.jpg`;
};
