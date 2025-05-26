import { useEffect, useCallback, useMemo } from "react";
import { useNavigate } from 'react-router-dom';
import { register, Hanko } from "@teamhanko/hanko-elements";

import './hanko-style.css'

const hankoApi = import.meta.env.VITE_HANKO_API_URL;
 
export default function HankoAuth() {
  const navigate = useNavigate();
 
  const hanko = useMemo(() => new Hanko(hankoApi), []);
 
  const redirectAfterLogin = useCallback(() => {
    // successfully logged in, redirect to a page in your application
    navigate("/dashboard");
  }, [navigate]);

  useEffect(
    () =>
      hanko?.onSessionCreated(() => {
        redirectAfterLogin();
      }),
    [hanko, redirectAfterLogin]
  );
 
  useEffect(() => {
    register(hankoApi).catch((error) => {
      // handle error
      console.log(error)
    });
  }, []);
 
  return <hanko-auth/>;
}
