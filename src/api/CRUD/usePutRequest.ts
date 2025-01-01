import { useState } from "react";
import { buildUrl, ParamsForUrl, SpotifyApiUrlsPut } from "../utils";
import { useAuthContext } from "../../context/AuthContextProvider";

// Custom hook for PUT request
export function usePutRequest<T>(url: SpotifyApiUrlsPut, params?: ParamsForUrl<typeof url>, body?: any) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const accessToken = useAuthContext();

  const put = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!accessToken) throw new Error("Access token is not available");

      // Build the final URL with parameters if needed
      const finalUrl = buildUrl(url, params || {});

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };

      // PUT request includes the body
      const response = await fetch(finalUrl, {
        method: "PUT",
        headers,
        body: body ? JSON.stringify(body) : undefined, // Include body if provided
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

  return { data, loading, error, put };
}
