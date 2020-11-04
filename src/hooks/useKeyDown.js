import React, { useEffect } from "react";

const useKeyDown = (key, callback) => {
    useEffect(() => {
        function handleKeydown(ev) {
          if (ev.code === key) {
            callback();
          }
        }
        window.addEventListener("keydown", handleKeydown)
        return () => {
          window.removeEventListener("keydown", handleKeydown)
        }
    })
    return
}

export default useKeyDown;