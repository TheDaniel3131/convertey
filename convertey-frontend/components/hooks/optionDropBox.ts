import { useEffect, useState } from "react";

export const useOptionDropBox = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const check = () => {
      if (
        typeof window !== "undefined" &&
        window.Dropbox &&
        typeof window.Dropbox.choose === "function"
      ) {
        setReady(true);
      } else {
        setTimeout(check, 200); // keep checking until ready
      }
    };

    check();
  }, []);

  return ready;
};
