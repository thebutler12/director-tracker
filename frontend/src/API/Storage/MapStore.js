import { Storage, Auth } from 'aws-amplify';

Storage.configure(window.amplify.Storage);

export const uploadObject = async (key, content, level, type, metadata) => {
  return Storage.put(key, content, {
    level: level,
    contentType: type,
    metadata: {
      username: `${await Auth.currentAuthenticatedUser().then(
        (response) => response.username
      )}`,
    },
  });
};

export const listObjects = (key, level) => {
  return Storage.list(key, { level: level });
};

export const removeObject = (key, level) => {
  return Storage.remove(key, { level: level });
};

export const getObject = async (key, level) => {
  return await Storage.get(key, { level: level })
    .then((result) => {
      return fetch(result)
        .then((response) => {
          return response.json();
        })
        .catch((err) => err);
    })
    .catch((err) => err);
};

export const generatePreSignedURL = (key, level, expires) => {
  return Storage.get(key, { level: level, expires: expires });
};
