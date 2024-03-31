import { useState, useEffect } from "react";
import axios from "axios";

const SERVER_DOMAIN = "http://localhost:5001/";

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState(
    code ? null : window.sessionStorage.getItem("accessToken")
  );
  const [refreshToken, setRefreshToken] = useState(
    window.sessionStorage.getItem("refreshToken") &&
      window.sessionStorage.getItem("refreshToken")
  );
  const [expiresIn, setExpiresIn] = useState(
    window.sessionStorage.getItem("expiresIn") &&
      window.sessionStorage.getItem("expiresIn")
  );

  useEffect(() => {
    if (code) {
      axios
        .post(SERVER_DOMAIN + "login", {
          code,
        })
        .then((res) => {
          setAccessToken(res.data.accessToken);
          setRefreshToken(res.data.refreshToken);
          setExpiresIn(res.data.expiresIn);
          window.sessionStorage.setItem("accessToken", res.data.accessToken);
          window.sessionStorage.setItem("refreshToken", res.data.refreshToken);
          window.sessionStorage.setItem("expiresIn", res.data.expiresIn);
          window.history.pushState({}, null, "/");
        })
        .catch(() => {
          window.location = "/";
        });
    }
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      axios
        .post(SERVER_DOMAIN + "refresh", {
          refreshToken,
        })
        .then((res) => {
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
          window.sessionStorage.setItem("accessToken", res.data.accessToken);
          window.sessionStorage.setItem("expiresIn", res.data.expiresIn);
        })
        .catch(() => {
          window.location = "/";
        });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return accessToken;
}
