"use client";

import { Button } from "@/components/ui/button";
import { FC, forwardRef, LegacyRef, useState } from "react";
import { cn } from "@/utils/utils";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ServerActionAction } from "next/dist/client/components/router-reducer/router-reducer-types";

export type TDefaultConfirmMessageProps = {
  Title: string;
  Description: string;
  BackFunction: () => void;
  CallbackText: string;
  className?: string;
  action?: (data: FormData) => void;
  Callback?: () => void;
};

export type TConfirmMessage = TDefaultConfirmMessageProps;

const ConfirmMessage: FC<TConfirmMessage> = forwardRef(
  (
    {
      Title,
      Description,
      Callback,
      BackFunction,
      CallbackText,
      className,
      action,
    },
    ref: LegacyRef<HTMLDivElement>,
  ) => {
    const [DisabledState, setDisabledState] = useState<boolean>(false);

    const clickMain = () => {
      if (!Callback) return;
      setDisabledState(true);
      Callback();
    };

    return (
      <div ref={ref} className={cn("grid place-items-center", className)}>
        <Card>
          <CardHeader>
            <CardTitle>{Title}</CardTitle>
            <CardDescription>{Description}</CardDescription>
          </CardHeader>
          <CardFooter className="flex gap-3">
            {action ? (
              <form className="flex gap-3" action={action}>
                <Buttons
                  clickBack={BackFunction}
                  state={DisabledState}
                  text={CallbackText}
                />
              </form>
            ) : (
              <Buttons
                clickBack={BackFunction}
                state={DisabledState}
                clickMain={clickMain}
                text={CallbackText}
              />
            )}
          </CardFooter>
        </Card>
      </div>
    );
  },
);

const Buttons: FC<{
  state: boolean;
  clickMain?: () => void;
  clickBack: () => void;
  text: string;
}> = ({ clickBack, clickMain, state, text }) => {
  return (
    <>
      <Button variant="destructive" onClick={clickMain} disabled={state}>
        {text}
      </Button>
      <Button
        variant="default"
        onClick={(e) => {
          e.preventDefault();
          clickBack();
        }}
      >
        Назад
      </Button>
    </>
  );
};

ConfirmMessage.displayName = "ConfirmMessage";
export default ConfirmMessage;
