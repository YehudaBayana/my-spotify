
  // const getRefreshToken = useCallback(async () => {
  //   // const refreshToken = localStorage.getItem("refresh_token");
  //   console.log('refreshToken ', refreshToken);

  //   if (!refreshToken) {
  //     console.error('No refresh token available');
  //     return;
  //   }

  //   const url = 'https://accounts.spotify.com/api/token';

  //   // const clientIdR = clientId;
  //   const clientSecret = CLIENT_SECRET;
  //   const basicAuth = btoa(`${clientId}:${clientSecret}`);

  //   const payload = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //       Authorization: `Basic ${basicAuth}`,
  //     },
  //     body: new URLSearchParams({
  //       grant_type: 'refresh_token',
  //       refresh_token: refreshToken,
  //     }),
  //   };

  //   try {
  //     const response = await fetch(url, payload);
  //     const data = await response.json();

  //     if (!response.ok) {
  //       console.error('Failed to refresh token', data);
  //       return;
  //     }

  //     localStorage.setItem('access_token', data.access_token);
  //     localStorage.setItem('expires_in', data.expires_in);
  //     setAccessToken(data.access_token);
  //     setExpiresIn(data.expires_in);
  //     if (data.refresh_token) {
  //       localStorage.setItem('refresh_token', data.refresh_token);
  //     }
  //   } catch (error) {
  //     console.error('Error refreshing token', error);
  //   }
  // }, [refreshToken]);
//--------------------------- gpt correction
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { SERVER_DOMAIN } from '../constants';
import { getUser } from './useFetchMusicInfo';

const getSessionItem = (key: string): string | null => {
  const item = window.localStorage.getItem(key);
  return item === 'undefined' || item === 'NaN' ? null : item;
};

export default function useAuth(code: string | null) {
  const [accessToken, setAccessToken] = useState<string | null>(getSessionItem('access_token'));
  const [refreshToken, setRefreshToken] = useState<string | null>(getSessionItem('refresh_token'));
  const [expiresIn, setExpiresIn] = useState<number>(Number(getSessionItem('expires_in')));

  const login = useCallback(async () => {
    try {
      const res = await axios.post<{ accessToken: string; refreshToken: string; expiresIn: number }>(`${SERVER_DOMAIN}login`, { code });
      const { accessToken, refreshToken, expiresIn } = res.data;

      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setExpiresIn(expiresIn);

      window.localStorage.setItem('access_token', accessToken);
      window.localStorage.setItem('refresh_token', refreshToken);
      window.localStorage.setItem('expires_in', expiresIn.toString());

      window.history.pushState({}, "", '/');
    } catch (error) {
      console.error('Login error:', error);
      window.location.href = '/';
    }
  }, [code]);

  const refreshAccessToken = useCallback(async () => {
    if (!refreshToken) return;

    try {
      const res = await axios.post<{ accessToken: string; expiresIn: number }>(`${SERVER_DOMAIN}refresh`, { refreshToken });
      const { accessToken, expiresIn } = res.data;

      setAccessToken(accessToken);
      setExpiresIn(expiresIn);

      window.localStorage.setItem('access_token', accessToken);
      window.localStorage.setItem('expires_in', expiresIn.toString());
    } catch (error) {
      console.error('Refresh token error:', error);
      window.location.href = '/';
    }
  }, [refreshToken]);

  useEffect(() => {
    if (code) {
      login();
    } else {
      async function verify() {
        if (accessToken) { 
          const userRes = await getUser(accessToken);
          if (userRes.error) {
            refreshAccessToken();
          }
        }
      }
      verify();
    }
    return () => {};
  }, [accessToken, code, login, refreshAccessToken]);

  useEffect(() => {
    if (!expiresIn) return;

    const refreshTokenTimeout = setInterval(() => {
      refreshAccessToken();
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(refreshTokenTimeout);
  }, [expiresIn, refreshAccessToken]);

  return accessToken;
}

//---------------------------
// import { useState, useEffect, useCallback } from "react";
// import axios from "axios";

// const SERVER_DOMAIN = "http://localhost:5001/";

// const getSessionItem = (key) => {
//   const item = window.localStorage.getItem(key);
//   return item === "undefined" || item === "NaN" ? null : item;
// };

// export default function useAuth(code) {
//   const [accessToken, setAccessToken] = useState(getSessionItem("accessToken"));
//   const [refreshToken, setRefreshToken] = useState(
//     getSessionItem("refreshToken")
//   );
//   const [expiresIn, setExpiresIn] = useState(
//     Number(getSessionItem("expiresIn"))
//   );

//   const login = useCallback(async () => {
//     try {
//       const res = await axios.post(`${SERVER_DOMAIN}login`, { code });
//       const { accessToken, refreshToken, expiresIn } = res.data;

//       setAccessToken(accessToken);
//       setRefreshToken(refreshToken);
//       setExpiresIn(expiresIn);

//       window.localStorage.setItem("accessToken", accessToken);
//       window.localStorage.setItem("refreshToken", refreshToken);
//       window.localStorage.setItem("expiresIn", expiresIn);

//       window.history.pushState({}, null, "/");
//     } catch (error) {
//       console.error("Login error:", error);
//       window.location = "/";
//     }
//   }, [code]);

//   const refreshAccessToken = useCallback(async () => {
//     if (!refreshToken) return;

//     try {
//       const res = await axios.post(`${SERVER_DOMAIN}refresh`, { refreshToken });
//       const { accessToken, expiresIn } = res.data;

//       setAccessToken(accessToken);
//       setExpiresIn(expiresIn);

//       window.localStorage.setItem("accessToken", accessToken);
//       window.localStorage.setItem("expiresIn", expiresIn);
//     } catch (error) {
//       console.error("Refresh token error:", error);
//       window.location = "/";
//     }
//   }, [refreshToken]);

//   useEffect(() => {
//     if (code) login();
//   }, [code, login]);

//   useEffect(() => {
//     if (!expiresIn) return;
//     console.log("expiresIn ", expiresIn);
//     const refreshInterval = (expiresIn - 60) * 1000;
//     const interval = setInterval(() => {
//       refreshAccessToken();
//     }, refreshInterval);

//     return () => clearInterval(interval);
//   }, [expiresIn, refreshAccessToken]);

//   return accessToken;
// }
/// --------------------
// import { useState, useEffect } from "react";
// import axios from "axios";

// const SERVER_DOMAIN = "http://localhost:5001/";

// export default function useAuth(code) {
//   let refreshTokenSession = window.localStorage.getItem("refreshToken");
//   let expiresInSession =
//     window.localStorage.getItem("expiresIn") == "undefined" ||
//     window.localStorage.getItem("expiresIn") == "NaN"
//       ? window.localStorage.removeItem("expiresIn")
//       : window.localStorage.getItem("expiresIn")
//       ? window.localStorage.getItem("expiresIn")
//       : null;
//   let accessTokenSession =
//     window.localStorage.getItem("accessToken") == "undefined"
//       ? window.localStorage.removeItem("accessToken")
//       : window.localStorage.getItem("accessToken")
//       ? window.localStorage.getItem("accessToken")
//       : null;
//   const [accessToken, setAccessToken] = useState(
//     accessTokenSession && accessTokenSession
//   );
//   const [refreshToken, setRefreshToken] = useState(
//     refreshTokenSession && refreshTokenSession
//   );
//   const [expiresIn, setExpiresIn] = useState(
//     expiresInSession && expiresInSession
//   );

//   useEffect(() => {
//     if (code) {
//       axios
//         .post(SERVER_DOMAIN + "login", {
//           code,
//         })
//         .then((res) => {
//           setAccessToken(res.data.accessToken);
//           setRefreshToken(res.data.refreshToken);
//           setExpiresIn(res.data.expiresIn);
//           window.localStorage.setItem("accessToken", res.data.accessToken);
//           window.localStorage.setItem("refreshToken", res.data.refreshToken);
//           window.localStorage.setItem("expiresIn", res.data.expiresIn);
//           if (window.localStorage.getItem("expiresIn") != "NaN") {
//             setInterval(() => {
//               let expiresInSession = Number(
//                 window.localStorage.getItem("expiresIn")
//               );
//               setExpiresIn(expiresInSession - (expiresInSession - 60));
//               window.localStorage.setItem(
//                 "expiresIn",
//                 String(expiresInSession - (expiresInSession - 60))
//               );
//             }, (expiresInSession - 60) * 1000);
//           } else {
//             window.localStorage.removeItem("expiresIn");
//           }
//           window.history.pushState({}, null, "/");
//         })
//         .catch(() => {
//           window.location = "/";
//         });
//     }
//   }, [code]);

//   useEffect(() => {
//     if (!refreshToken || !expiresIn) return;
//     const interval = setInterval(() => {
//       axios
//         .post(SERVER_DOMAIN + "refresh", {
//           refreshToken,
//         })
//         .then((res) => {
//           console.log("resssss ", res);
//           setAccessToken(res.data.accessToken);
//           setExpiresIn(res.data.expiresIn);
//           window.localStorage.setItem("accessToken", res.data.accessToken);
//           window.localStorage.setItem("expiresIn", res.data.expiresIn);
//         })
//         .catch((err) => {
//           console.log("errrrrrrr ", err);
//           window.location = "/";
//         });
//     }, (expiresIn - 60) * 1000);

//     return () => clearInterval(interval);
//   }, [refreshToken, expiresIn]);

//   // useEffect(() => {
//   //   console.log("aa refreshToken ",refreshToken);
//   //   console.log("aa accessToken ", accessToken);
//   //   if (!refreshToken || accessToken) return;
//   //   axios
//   //     .post(SERVER_DOMAIN + 'refresh', {
//   //       refreshToken,
//   //     })
//   //     .then((res) => {
//   //       console.log('res refresh ', res);
//   //       setAccessToken(res.data.accessToken);
//   //       setExpiresIn(res.data.expiresIn);
//   //     })
//   //     .catch(() => {
//   //       window.location = '/';
//   //     });
//   // }, [refreshToken, accessToken]);

//   return accessToken;
// }
