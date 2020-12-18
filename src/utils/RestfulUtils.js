/** @format */

import axios from 'axios';

const accessToken = () => {
  return sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');
};

export default {
  get: function (url) {
    return new Promise(async (resolve, reject) => {
      await axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${accessToken()}`,
          },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          resolve(err.response);
        });
    });
  },
  post: async function (url, body) {
    return new Promise(async (resolve, reject) => {
      await axios
        .post(url, body, {
          headers: {
            Authorization: `Bearer ${accessToken()}`,
          },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          resolve(err.response);
        });
    });
  },

  patch: function (url, body) {
    return new Promise(async (resolve, reject) => {
      await axios
        .patch(url, body, {
          headers: {
            Authorization: `Bearer ${accessToken()}`,
          },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          resolve(err.response);
        });
    });
  },
  remove: function (url) {
    return new Promise(async (resolve, reject) => {
      await axios
        .delete(url, {
          headers: {
            Authorization: `Bearer ${accessToken()}`,
          },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          resolve(err.response);
        });
    });
  },
};
