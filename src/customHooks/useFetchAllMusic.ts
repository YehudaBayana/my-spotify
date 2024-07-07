import { useContext, useEffect } from "react";

// Import the type for StoreContext from its location (replace with actual path)
import { StoreContext } from "../context/ContextProvider";

// Import the type for fetchInitialData (replace with actual path)
import { fetchInitialData } from "./useFetchMusicInfo";

interface StoreState {
  // Add properties based on the actual state object in StoreContext
}

const useFetchAllMusic = (accessToken: string) => {
  const { state, dispatch }: { state: StoreState; dispatch: any } = useContext(
    StoreContext
  );

  useEffect(() => {
    if (!accessToken) return;

    fetchInitialData(dispatch, accessToken);
    return () => {};
  }, [accessToken, dispatch]);

  return; // Optional to explicitly return nothing (void)
};

export default useFetchAllMusic;
