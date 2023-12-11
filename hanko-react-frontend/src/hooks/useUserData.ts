import { useState, useEffect, useMemo } from "react";
import { Hanko } from "@teamhanko/hanko-elements";

const hankoApi = import.meta.env.VITE_HANKO_API_URL;

interface HankoUser {
  id: string;
  email: string;
  loading: boolean;
  error: string | null;
}

export function useUserData(): HankoUser {
  const hanko = useMemo(() => new Hanko(hankoApi), []);
  const [userState, setUserState] = useState<HankoUser>({
    id: "",
    email: "",
    loading: true,
    error: null,
  });

  useEffect(() => {
    hanko?.user
      .getCurrent()
      .then(({ id, email }) => {
        setUserState({ id, email, loading: false, error: null });
      })
      .catch((error) => {
        setUserState((prevState) => ({ ...prevState, loading: false, error }));
      });
  }, [hanko]);

  return userState;
}
