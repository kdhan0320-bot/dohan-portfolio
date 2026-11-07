import { useState } from "react";
import { DEMO_USER } from "../constants/demoUser";
import AuthContext from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [isGuest, setIsGuest] = useState(false);

  const enterGuestMode = () => setIsGuest(true);
  const exitGuestMode = () => setIsGuest(false);

  return (
    <AuthContext.Provider
      value={{
        isGuest,
        guestIdentity: DEMO_USER,
        enterGuestMode,
        exitGuestMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
