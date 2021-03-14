import { useState, useCallback, useEffect } from "react";
let logoutTimer; // int

export const useAuth = () => {
  const [userId, setUserID] = useState();
  const [token, setToken] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState<Date>();

  // 자동 로그인 여부 체크
  useEffect(() => {
    const storageToken = JSON.parse(localStorage.getItem("userData"));
    if (storageToken) {
      setUserID(storageToken.userId);
      setToken(storageToken.token);
      const expirationDate = new Date(storageToken.expiration);
      console.log(`expirationDate:`, expirationDate);
      setTokenExpirationDate(expirationDate);
    }
  }, []);

  const login = useCallback(({ userId, token, expirationDate }) => {
    console.log(userId);
    console.log(token);
    setUserID(userId);
    setToken(token);
    expirationDate = new Date(expirationDate);
    console.log(`expirationDate:`, expirationDate);
    setTokenExpirationDate(expirationDate);

    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId,
        token,
        expiration: expirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setUserID(null);
    setToken(null);
    setTokenExpirationDate(null);
    localStorage.removeItem("userData");
  }, []);

  // Timer
  useEffect(() => {
    if (token && tokenExpirationDate) {
      const RemainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, RemainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  });

  return { userId, token, tokenExpirationDate, login, logout };
};
