import { useState } from "react";

const useNavigation = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  function handleChangeAdmin() {
    setIsAdmin(prev => !prev);
  }

  return { isAdmin, handleChangeAdmin };
};

export default useNavigation;
