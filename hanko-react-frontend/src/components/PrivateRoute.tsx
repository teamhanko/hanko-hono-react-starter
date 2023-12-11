import { ReactNode, useEffect, useState } from 'react';
// import { Navigate, useLocation } from 'react-router-dom';

interface PrivateRouteProps {
  children: ReactNode;
  unauthorizedMessage: string;
}

function PrivateRoute({ children, unauthorizedMessage }: PrivateRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  // const location = useLocation();

  useEffect(() => {
    fetch('http://localhost:8000/protected', {
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

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <>
    <div>{unauthorizedMessage}</div>

    {/* Or redirect to login */}
    {/* <Navigate to="/login" replace state={{ from: location }} /> */}
    </>
  );
}

export default PrivateRoute;