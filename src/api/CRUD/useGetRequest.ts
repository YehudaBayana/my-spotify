import { useState, useEffect } from "react";
import { buildUrl, ParamsForUrl, SpotifyApiUrlsGet } from "../utils";
import { useAuthContext } from "../../context/AuthContextProvider";

export function useGetRequest<
  T extends SpotifyApiUrlsGet,
  U extends ParamsForUrl<T>,
  R // Define a generic type for the response data
>(url: T) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { accessToken } = useAuthContext();

  const get = async (params?: U) => {
    setLoading(true);
    setError(null);

    try {
      if (!accessToken) throw new Error("Access token is not available");

      const finalUrl = buildUrl(url, params || {});

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await fetch(finalUrl, { method: "GET", headers });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const result = await response.json();
      setData(result);
      return result;
    } catch (err) {
      console.log("Err ", err);

      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { data, isLoading: loading, isError: error, get };
}
