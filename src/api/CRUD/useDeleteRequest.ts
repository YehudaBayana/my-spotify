import { useState } from "react";
import { buildUrl, ParamsForUrl, SpotifyApiUrlsDelete } from "../utils";
import { useAuthContext } from "../../context/AuthContextProvider";

export function useDeleteRequest<T>(url: SpotifyApiUrlsDelete) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const accessToken = useAuthContext();

  const del = async (params: ParamsForUrl<typeof url>, body?: any) => {
    setLoading(true);
    setError(null);

    try {
      if (!accessToken) throw new Error("Access token is not available");

      const finalUrl = buildUrl(url, params);

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await fetch(finalUrl, {
        method: "DELETE",
        headers,
        body: body ? JSON.stringify(body) : undefined, // Only include body if provided
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

  return { data, loading, error, del };
}
