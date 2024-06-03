import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const SERVER_DOMAIN = "http://localhost:5001/";

const getSessionItem = (key) => {
  const item = window.sessionStorage.getItem(key);
  return item === "undefined" || item === "NaN" ? null : item;
};

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState(getSessionItem("accessToken"));
  const [refreshToken, setRefreshToken] = useState(
    getSessionItem("refreshToken")
  );
  const [expiresIn, setExpiresIn] = useState(
    Number(getSessionItem("expiresIn"))
  );

  const login = useCallback(async () => {
    try {
      const res = await axios.post(`${SERVER_DOMAIN}login`, { code });
      const { accessToken, refreshToken, expiresIn } = res.data;

      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setExpiresIn(expiresIn);

      window.sessionStorage.setItem("accessToken", accessToken);
      window.sessionStorage.setItem("refreshToken", refreshToken);
      window.sessionStorage.setItem("expiresIn", expiresIn);

      window.history.pushState({}, null, "/");
    } catch (error) {
      console.error("Login error:", error);
      window.location = "/";
    }
  }, [code]);

  const refreshAccessToken = useCallback(async () => {
    if (!refreshToken) return;

    try {
      const res = await axios.post(`${SERVER_DOMAIN}refresh`, { refreshToken });
      const { accessToken, expiresIn } = res.data;

      setAccessToken(accessToken);
      setExpiresIn(expiresIn);

      window.sessionStorage.setItem("accessToken", accessToken);
      window.sessionStorage.setItem("expiresIn", expiresIn);
    } catch (error) {
      console.error("Refresh token error:", error);
      window.location = "/";
    }
  }, [refreshToken]);

  useEffect(() => {
    if (code) login();
  }, [code, login]);

  useEffect(() => {
    if (!expiresIn) return;

    const refreshInterval = (expiresIn - 60) * 1000;
    const interval = setInterval(() => {
      refreshAccessToken();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [expiresIn, refreshAccessToken]);

  return accessToken;
}

// import { useState, useEffect } from "react";
// import axios from "axios";

// const SERVER_DOMAIN = "http://localhost:5001/";

// export default function useAuth(code) {
//   let refreshTokenSession = window.sessionStorage.getItem("refreshToken");
//   let expiresInSession =
//     window.sessionStorage.getItem("expiresIn") == "undefined" ||
//     window.sessionStorage.getItem("expiresIn") == "NaN"
//       ? window.sessionStorage.removeItem("expiresIn")
//       : window.sessionStorage.getItem("expiresIn")
//       ? window.sessionStorage.getItem("expiresIn")
//       : null;
//   let accessTokenSession =
//     window.sessionStorage.getItem("accessToken") == "undefined"
//       ? window.sessionStorage.removeItem("accessToken")
//       : window.sessionStorage.getItem("accessToken")
//       ? window.sessionStorage.getItem("accessToken")
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
//           window.sessionStorage.setItem("accessToken", res.data.accessToken);
//           window.sessionStorage.setItem("refreshToken", res.data.refreshToken);
//           window.sessionStorage.setItem("expiresIn", res.data.expiresIn);
//           if (window.sessionStorage.getItem("expiresIn") != "NaN") {
//             setInterval(() => {
//               let expiresInSession = Number(
//                 window.sessionStorage.getItem("expiresIn")
//               );
//               setExpiresIn(expiresInSession - (expiresInSession - 60));
//               window.sessionStorage.setItem(
//                 "expiresIn",
//                 String(expiresInSession - (expiresInSession - 60))
//               );
//             }, (expiresInSession - 60) * 1000);
//           } else {
//             window.sessionStorage.removeItem("expiresIn");
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
//           window.sessionStorage.setItem("accessToken", res.data.accessToken);
//           window.sessionStorage.setItem("expiresIn", res.data.expiresIn);
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
