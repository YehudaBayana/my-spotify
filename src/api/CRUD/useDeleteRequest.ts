// useDeleteRequest.ts
import { useState } from "react";
import { buildUrl, SpotifyApiUrls } from "../utils";
import { useAuthContext } from "../../context/AuthContextProvider";

export function useDeleteRequest<T>(url: SpotifyApiUrls, params?: Record<string, any>, body?: any): { del: () => Promise<T> }  {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { accessToken } = useAuthContext();

  const del = async (): Promise<T> => {
    setLoading(true);
    const finalUrl = buildUrl(url, params||{});

      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      };
      const response = await fetch(finalUrl, {
        method: 'DELETE',
        headers,
        body: JSON.stringify(body)
      });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      return response.json();
      // setData(result);
    
  };

  return { del };
}
