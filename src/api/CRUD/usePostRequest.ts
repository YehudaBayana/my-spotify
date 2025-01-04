// usePostRequest.ts
import { useState } from "react";
import { buildUrl, SpotifyApiUrls } from "../utils";
import { useAuthContext } from "../../context/AuthContextProvider";

export function usePostRequest<T>(url: SpotifyApiUrls, params?: Record<string, any>, body?: any): { post: () => Promise<T> }  {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { accessToken } = useAuthContext();

  const post = async (): Promise<T> => {
    setLoading(true);
    const finalUrl = buildUrl(url, params || {});
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      };
      const response = await fetch(finalUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
      });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return response.json();
   
  };

  return { post };
}
