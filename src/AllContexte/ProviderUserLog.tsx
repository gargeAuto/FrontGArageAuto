import {useEffect, useMemo, useState} from "react";
import {UserContexte} from "./UserContexte";

export const ProviderUserLog = ({children} : {children: React.ReactNode}) => {
   const [isLogUser, setIsLogUser] = useState(() => !!localStorage.getItem("af.account"));
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    // Vérifie immédiatement le token au montage
    const token = localStorage.getItem("af.account");
    setIsLogUser(!!token);
    setLoading(false);

    // Met à jour si le localStorage change (autre onglet, etc.)
    const handleStorageChange = () => {
      const token = localStorage.getItem("af.account");
      setIsLogUser(!!token);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <UserContexte.Provider value={{isLogUser, setIsLogUser, loading}}>
      {loading ? null : children}
    </UserContexte.Provider>
  );
}