import { useState, useEffect } from 'react';
import axios from 'axios';

const SERVER_DOMAIN = 'http://localhost:5001/';

export default function useAuth(code) {
  // let refreshTokenSession = window.sessionStorage.getItem('refreshToken');
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    if (code) {
      axios
        .post(SERVER_DOMAIN + 'login', {
          code,
        })
        .then((res) => {
          setAccessToken(res.data.accessToken);
          setRefreshToken(res.data.refreshToken);
          setExpiresIn(res.data.expiresIn);
          window.history.pushState({}, null, '/');
        })
        .catch(() => {
          window.location = '/';
        });
    }
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      axios
        .post(SERVER_DOMAIN + 'refresh', {
          refreshToken,
        })
        .then((res) => {
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
        })
        .catch(() => {
          window.location = '/';
        });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  // useEffect(() => {
  //   console.log("aa refreshToken ",refreshToken);
  //   console.log("aa accessToken ", accessToken);
  //   if (!refreshToken || accessToken) return;
  //   axios
  //     .post(SERVER_DOMAIN + 'refresh', {
  //       refreshToken,
  //     })
  //     .then((res) => {
  //       console.log('res refresh ', res);
  //       setAccessToken(res.data.accessToken);
  //       setExpiresIn(res.data.expiresIn);
  //     })
  //     .catch(() => {
  //       window.location = '/';
  //     });
  // }, [refreshToken, accessToken]);

  return accessToken;
}
