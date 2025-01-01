//--------------------------- gpt correction
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { SERVER_DOMAIN } from "../constants";
import { useGetRequest } from "../api/CRUD/useGetRequest";
import { SpotifyApiUrlsGet } from "../api/utils";

// import { getUser } from "./useFetchMusicInfo";

const getSessionItem = (key: string): string | null => {
  const item = window.localStorage.getItem(key);
  return item === "undefined" || item === "NaN" ? null : item;
};

export default function useAuth(code: string | null, setAccessToken: (token: string | null) => void) {
  const [refreshToken, setRefreshToken] = useState<string | null>(getSessionItem("refresh_token"));
  const [expiresIn, setExpiresIn] = useState<number>(Number(getSessionItem("expires_in")));
  const { isError, get } = useGetRequest(SpotifyApiUrlsGet.GET_USER);

  const login = useCallback(async () => {
    try {
      const res = await axios.post<{ accessToken: string; refreshToken: string; expiresIn: number }>(`${SERVER_DOMAIN}login`, { code });
      const { accessToken, refreshToken, expiresIn } = res.data;

      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setExpiresIn(expiresIn);

      window.localStorage.setItem("access_token", accessToken);
      window.localStorage.setItem("refresh_token", refreshToken);
      window.localStorage.setItem("expires_in", expiresIn.toString());

      window.history.pushState({}, "", "/");
    } catch (error) {
      console.error("Login error:", error);
      window.location.href = "/";
    }
  }, [code, setAccessToken]);

  const refreshAccessToken = useCallback(async () => {
    if (!refreshToken) return;
    console.log("refresh access", refreshToken);

    try {
      const res = await axios.post<{ accessToken: string; expiresIn: number }>(`${SERVER_DOMAIN}refresh`, { refreshToken });
      const { accessToken, expiresIn } = res.data;
      console.log("aaa yuda ", accessToken);
      // console.log("aaa yuda ",accessToken);

      setAccessToken(accessToken);
      setExpiresIn(expiresIn);

      window.localStorage.setItem("access_token", accessToken);
      window.localStorage.setItem("expires_in", expiresIn.toString());
    } catch (error) {
      console.error("Refresh token error:", error);
      window.location.href = "/";
    }
  }, [refreshToken, setAccessToken]);

  useEffect(() => {
    if (code) {
      login();
    } else {
      async function verify() {
        const res = await get();

        if (!res || res?.error) {
          refreshAccessToken();
        }
      }
      verify();
    }
  }, [code, login, refreshAccessToken]);

  useEffect(() => {
    if (!expiresIn) return;

    const refreshTokenTimeout = setInterval(() => {
      refreshAccessToken();
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(refreshTokenTimeout);
  }, [expiresIn, refreshAccessToken]);
}
