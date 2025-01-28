import { Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useEffect, ReactElement } from "react";
import AuthScreen from "./screens/AuthScreen";
import LandingPage from "./screens/LandingPage";
import Dashborad from "./screens/Dashborad";

function App(): ReactElement {
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn) console.log("User Info:", user);
  }, [isLoaded, isSignedIn, user]);

  const renderRoute = (
    authCondition: boolean | unknown,
    Component: ReactElement,
    redirectPath: string
  ) => (authCondition ? <Navigate to={redirectPath} replace /> : Component);

  if(!isLoaded) return <div></div>

  return (
    <Routes>
      <Route
        path="/"
        element={renderRoute(isSignedIn, <LandingPage />, "/dashboard")}
      />
      <Route
        path="/auth"
        element={renderRoute(isSignedIn, <AuthScreen />, "/dashboard")}
      />
      <Route
        path="/dashboard"
        element={renderRoute(!isSignedIn, <Dashborad />, "/auth")}
      />
    </Routes>
  );
}

export default App;
