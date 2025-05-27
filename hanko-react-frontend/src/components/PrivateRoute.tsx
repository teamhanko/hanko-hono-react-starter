import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function PrivateRoute({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const location = useLocation();
  
    useEffect(() => {
      fetch('http://localhost:5001/validate', {// Change this to the validation url of your running backend
        credentials: 'include', // This is required to include the cookie in the request
      })
        .then((res) => {
          setIsAuthenticated(res.ok);
        })
        .catch(() => {
          setIsAuthenticated(false);
        });
    }, []);
  
    if (isAuthenticated === null) {
      return null; // Or a loading spinner
    }

    if(isAuthenticated){ return <>{children}</> }

    //Url to naviage user to if they arent authenticated
    return <Navigate to="/" replace state={{ from: location }} />
  }