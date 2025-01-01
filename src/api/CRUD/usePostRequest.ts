import { useState } from "react";
import { buildUrl, ParamsForUrl, SpotifyApiUrlsPost } from "../utils";
import { useAuthContext } from "../../context/AuthContextProvider";

// Custom hook for POST request
export function usePostRequest<T>(url: SpotifyApiUrlsPost) {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const accessToken = useAuthContext();

  const post = async (params?: ParamsForUrl<typeof url>, body?: any) => {
    setLoading(true);
    setError(null);

    try {
      if (!accessToken) throw new Error("Access token is not available");

      const finalUrl = buildUrl(url, params || {});

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await fetch(finalUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(body), // Include params as the request body
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const result = await response.json();
      setData(result);
      return result;
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, post };
}
