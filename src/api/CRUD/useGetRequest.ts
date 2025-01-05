// useGetRequest.ts
import { useState } from "react";
import { buildUrl, SpotifyApiUrls } from "../utils";
import { useAuthContext } from "../../context/AuthContextProvider";

export function useGetRequest<T>(
  url: SpotifyApiUrls,
  params?: Record<string, string | string[]>
): { get: () => Promise<T> } {
  const { accessToken } = useAuthContext();

  const get = async (): Promise<T> => {
    if (!accessToken) throw new Error('Access token is not available');
console.log("url ",url);
console.log("params ",params);

    const finalUrl = buildUrl(url, params || {});
    console.log("finalUrl ",finalUrl);
    
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };

    const response = await fetch(finalUrl, { method: 'GET', headers });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return response.json();
  };

  return { get };
}


export const getRequest = async (url:string): Promise<any> => {
const accessToken = localStorage.getItem("access_token")
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    };
    const response = await fetch(url, {
      method: 'GET',
      headers,
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return response.json();
};