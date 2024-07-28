import React, {useState, useEffect, Dispatch, SetStateAction} from 'react';

type UseOutsideClickHook = (ref: React.RefObject<any>, set: Dispatch<SetStateAction<boolean>>) => boolean;

const useOutsideClick: UseOutsideClickHook = (ref, set) => {
  const [isOutsideClick, setIsOutsideClick] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const targetRole = (event.target as HTMLElement).getAttribute('role');
      if (ref.current && !ref.current.contains(event.target as Node) && targetRole !== "option") {
        set(false);
        return;
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [ref]);

  return isOutsideClick;
};

export default useOutsideClick;