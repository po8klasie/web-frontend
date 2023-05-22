'use client';

import { useEffect } from "react";
import useURLParser from "../_hooks/useURLParser";
import useURLSerializer from "../_hooks/useURLSerializer";

const updateURL = (serializedClientQueryString: string, serializedMapPosition: string) => {
  const qs = serializedClientQueryString ? `?${serializedClientQueryString}` : '';
  const hash = serializedMapPosition ? `#${serializedMapPosition}` : '';

  window.history.replaceState(null, '', [window.location.pathname, qs, hash].join(''));
};

const URLModifier = () => {
  useURLParser();
  const { serializedClientQueryString, serializedMapPosition } =
    useURLSerializer();

  useEffect(() => {
    updateURL(serializedClientQueryString, serializedMapPosition);
  }, [serializedClientQueryString, serializedMapPosition]);

  return null;
}

export default URLModifier
