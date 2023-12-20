"use client";

import { createContext, ReactNode, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";

export interface IDropDownMenu {
  children: ReactNode;
}

export const DropDownContext = createContext(false);

export default function DropDownMenu({ children }: IDropDownMenu) {
  const [IsActive, setIsActive] = useState(false);

  return (
    <div>
      <DropDownContext.Provider value={IsActive}>
        <div onClick={() => setIsActive((prev) => !prev)}>{children}</div>
      </DropDownContext.Provider>
      <AnimatePresence>
        {IsActive && (
          <motion.section
            initial={{ opacity: 0, translateY: -15 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: -10 }}
            className={`w-36 h-36 bg-neutral-200 dark:bg-neutral-500 rounded-md absolute right-0 mt-6 
            shadow-2xl dark:shadow-neutral-700
        `}
          ></motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
