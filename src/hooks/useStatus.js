import React, { useEffect, useState } from "react";
import { auth } from "../redux/vocabActionsCreators.js";
import { onAuthStateChanged } from "firebase/auth";

const useStatus = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return unsub;
  }, [user]);

  return { user };
};

export default useStatus;
