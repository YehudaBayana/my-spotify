//--------------------------- gpt correction
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { reducerActionTypes, SERVER_DOMAIN } from '../constants';
import { getUser } from './useFetchMusicInfo';

const getSessionItem = (key: string): string | null => {
  const item = window.localStorage.getItem(key);
  return item === 'undefined' || item === 'NaN' ? null : item;
};

export default function useAuth(code: string | null, dispatch:any) {
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
      console.log("res ",res);
      
      const { accessToken, expiresIn } = res.data;

      dispatch({
        type: reducerActionTypes.SET_ACCESS_TOKEN,
        payload: accessToken
      })
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
