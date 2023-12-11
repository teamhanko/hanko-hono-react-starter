import { useEffect } from "react";
import { register } from "@teamhanko/hanko-elements";

const hankoApi = import.meta.env.VITE_HANKO_API_URL;

export default function HankoProfile() {
  useEffect(() => {
    register(hankoApi).catch((error) => {
      console.log(error)
    });
  }, []);

  return <hanko-profile />;
}
