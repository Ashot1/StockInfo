"use client";

import { ButtonHTMLAttributes, FC, HTMLAttributes, ReactNode } from "react";
import { motion, MotionProps } from "framer-motion";

export type TTransparentButton = ButtonHTMLAttributes<HTMLButtonElement> &
  MotionProps & {
    children: ReactNode;
    dopClass?: string;
    TapEffect?: boolean;
  };

const TransparentButton: FC<TTransparentButton> = ({
  dopClass,
  children,
  TapEffect = true,
  ...props
}) => {
  return (
    <motion.button
      whileTap={{ scale: TapEffect ? 0.9 : 1 }}
      type="button"
      className={`flex items-center justify-center ${dopClass ? dopClass : ""}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default TransparentButton;
