import { ButtonHTMLAttributes, FC, ReactNode } from "react";

export interface ITransparentButton
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  dopClass?: string;
}

const TransparentButton: FC<Omit<ITransparentButton, "className">> = ({
  dopClass,
  children,
  ...props
}) => {
  return (
    <button
      className={`flex items-center justify-center ${dopClass ? dopClass : ""}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default TransparentButton;
