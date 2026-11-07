import { useState } from "react";
import { DEMO_USER } from "../constants/demoUser";
import { readStored, writeStored } from "../utils/storage";
import AuthContext from "./AuthContext";
export const AuthProvider = ({ children }) => {
  const [isGuest, setIsGuest] = useState(() =>
    readStored("entered", false, (v) => typeof v === "boolean"),
  );
  const enterGuestMode = () => {
    setIsGuest(true);
    writeStored("entered", true);
  };
  const exitGuestMode = () => {
    setIsGuest(false);
    writeStored("entered", false);
  };
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
