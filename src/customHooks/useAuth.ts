import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { SERVER_DOMAIN } from "../constants";
import { useGetUserProfile } from '../api/spotifyApi';

const getSessionItem = (key: string): string | null => {
  const item = window.localStorage.getItem(key);
  return item === "undefined" || item === "NaN" ? null : item;
};

export default function useAuth(code: string | null) {
  const [accessToken, setLocalAccessToken] = useState<string | null>(getSessionItem("access_token"));
  const [refreshToken, setRefreshToken] = useState<string | null>(getSessionItem("refresh_token"));
  const [expiresAt, setExpiresAt] = useState<number | null>(Number(getSessionItem("expires_at"))); // Store actual expiration time
  const user = useGetUserProfile();

  const login = useCallback(async () => {
    try {
      const res = await axios.post<{ accessToken: string; refreshToken: string; expiresIn: number }>(`${SERVER_DOMAIN}login`, { code });
      const { accessToken, refreshToken, expiresIn } = res.data;

      const expiresAt = Date.now() + expiresIn * 1000; // Calculate the actual expiration timestamp

      setLocalAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setExpiresAt(expiresAt);

      window.localStorage.setItem("access_token", accessToken);
      window.localStorage.setItem("refresh_token", refreshToken);
      window.localStorage.setItem("expires_at", expiresAt.toString());

      window.history.pushState({}, "", "/");
    } catch (error) {
      console.error("Login error:", error);
      window.location.href = "/";
    }
  }, [code]);

  const refreshAccessToken = useCallback(async () => {
    if (!refreshToken) return;

    try {
      const res = await axios.post<{ accessToken: string; expiresIn: number }>(`${SERVER_DOMAIN}refresh`, { refreshToken });
      const { accessToken, expiresIn } = res.data;

      const expiresAt = Date.now() + expiresIn * 1000;

      setLocalAccessToken(accessToken);
      setExpiresAt(expiresAt);

      window.localStorage.setItem("access_token", accessToken);
      window.localStorage.setItem("expires_at", expiresAt.toString());
    } catch (error) {
      console.error("Refresh token error:", error);
      window.location.href = "/";
    }
  }, [refreshToken]);

  useEffect(() => {
    if (code) {
      login();
    } else {
      if (!user && accessToken && expiresAt && Date.now() >= expiresAt) {
        // If the access token has expired, refresh it
        refreshAccessToken();
      }
    }
  }, [code, login, user, accessToken, expiresAt, refreshAccessToken]);

  useEffect(() => {
    if (!expiresAt) return;
  
    const timeUntilExpiry = expiresAt - Date.now() - 60000; // Refresh 1 minute early
    if (timeUntilExpiry > 0) {
      const timeoutId = setTimeout(refreshAccessToken, timeUntilExpiry);
      return () => clearTimeout(timeoutId);
    }
  }, [expiresAt, refreshAccessToken]);
}
