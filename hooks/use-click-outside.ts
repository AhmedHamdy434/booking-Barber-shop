import { useEffect, useRef, RefObject } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  // Use a ref for the handler to avoid re-attaching listeners on every render
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Do nothing if clicking ref's element or descendent elements
      const target = event.target as Node;
      if (!ref.current || ref.current.contains(target)) {
        return;
      }
      savedHandler.current(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref]);
}
