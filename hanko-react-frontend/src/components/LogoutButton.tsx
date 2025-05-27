import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Hanko } from "@teamhanko/hanko-elements";

const hankoApi = import.meta.env.VITE_HANKO_API_URL;

function LogoutBtn() {
  const navigate = useNavigate();
  const [hanko, setHanko] = useState<Hanko>();

  useEffect(() => {
    import("@teamhanko/hanko-elements").then(({ Hanko }) =>
      setHanko(new Hanko(hankoApi ?? ""))
    );
  }, []);

  const logout = async () => {
    try {
      await hanko?.logout();
      
      navigate("/"); //Path to naviage to once the user logs out.

    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return <button onClick={logout}>Logout</button>;
}

export default LogoutBtn;
