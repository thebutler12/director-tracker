
import { retryAttempts } from '../config/api-retry';
import { API, Auth } from 'aws-amplify';
// import moment from  'moment';

// async function testCognitoGateway() {
//   let apiName = 'cognito-identity';
//   let myInit = {
//     body: {
//       IdentityPoolId: 'eu-west-1:7a331c64-af8f-4750-8234-d22f7a5a82cb',
//       MaxResults: 10,
//     },
//     headers: {
//       'CONTENT-TYPE': 'application/json',
//       // 'CONTENT-LENGTH': '234',
//       // 'HOST': `https://cognito-identity.eu-west-1.amazonaws.com`,
//       // 'X-AMZ-DATE': `${new moment.utc().format('YYYYMMDDTHHmmss')}Z`,
//       'X-AMZ-TARGET': 'com.amazonaws.cognito.identity.model.AWSCognitoIdentityService.ListIdentities'

//     }
//   };
//   console.dir(myInit)
//   return API.post(apiName, '', myInit)
//     .then((response) => {
//       console.dir(response);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }

export const sendGetRequest = async (query, processor) => {
  let apiName = 'PerspectiveWebRestAPI';
  let path = `/resources${query.command}`;
  let myInit = {
    headers: {
      Authorization: `Bearer ${(await Auth.currentSession())
        .getIdToken()
        .getJwtToken()}`,
    },
  };

  return API.get(apiName, path, myInit)
    .then((response) => {
      return wrapResponse(processor(response, query.params), false);
    })
    .catch((error) => {
      return wrapResponse(error, true);
    });
};

export const sendPostRequest = async (query, processor) => {
  let apiName = 'PerspectiveWebRestAPI';
  let path = `/resources`;
  let myInit = {
    body: query.body,
    headers: {
      Authorization: `Bearer ${(await Auth.currentSession())
        .getIdToken()
        .getJwtToken()}`,
    },
  };
  return API.post(apiName, path, myInit)
    .then((response) => {
      return wrapResponse(processor(response, query.params), false);
    })
    .catch((error) => {
      return wrapResponse(error, true);
    });
};

export const sendDrawioPostRequest = async (query, processor) => {
  let apiName = 'PerspectiveDrawioWebRestAPI';
  let path = `/resources`;
  let myInit = {
    body: query.body,
    headers: {
      Authorization: `Bearer ${(await Auth.currentSession())
        .getIdToken()
        .getJwtToken()}`,
    },
  };

  return API.post(apiName, path, myInit)
    .then((response) => {
      return wrapResponse(processor(response, query.params), false);
    })
    .catch((error) => {
      return wrapResponse(error, true);
    });
};

export const requestWrapper = async (request, data, attempts = 0) => {
  let response = await request(data, data.processor);
  if (response.error && attempts < retryAttempts) {
    console.log(`attempts: ${attempts}`);
    console.log(
      `retrying but waiting for ${getExponentialBackoff(attempts)} milliseconds`
    );
    attempts++;
    setTimeout(
      async () => await requestWrapper(request, data, attempts),
      getExponentialBackoff(attempts)
    );
  }
  return response;
};
function getExponentialBackoff(attempts) {
  return Math.max((attempts *= 2), 1) * 1000;
}

const wrapResponse = (data, error) => {
  return {
    error: error,
    body: data,
  };
};
