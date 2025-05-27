import { useEffect } from "react";
import { register } from "@teamhanko/hanko-elements";

import './hanko-style.css'

const hankoApi = import.meta.env.VITE_HANKO_API_URL;

export default function HankoProfile() {
  useEffect(() => {
    register(hankoApi).catch((error) => {
      // handle error
      console.log(error)
    });
  }, []);

  return <hanko-profile />;
}
