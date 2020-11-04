import React, { useEffect } from "react";

const useKeyDown = (keydown, callback) => {
    useEffect(() => {
        function handleKeydown(ev) {
          if (ev.code === keydown) {
            document.activeElement.blur();
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