import React, { useCallback, useEffect, useState } from "react";

function useToggle(defaultVal = false) {
  const [visible, setVisible] = useState(defaultVal);

  let toggle = useCallback(() => {
    setVisible((prevVal) => !prevVal);
  }, []);

  return [visible, toggle, setVisible];
}

export default useToggle; 
