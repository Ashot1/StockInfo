"use client";

import { Button } from "@/components/ui/button";
import { FC, forwardRef, LegacyRef } from "react";
import { cn } from "@/utils/utils";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface IConfirmMessage {
  Title: string;
  Description: string;
  BackFunction: () => void;
  Callback: () => void;
  CallbackText: string;
  className?: string;
}

const ConfirmMessage: FC<IConfirmMessage> = forwardRef(
  (
    { Title, Description, Callback, BackFunction, CallbackText, className },
    ref: LegacyRef<HTMLDivElement>,
  ) => {
    return (
      <div ref={ref} className={cn("grid place-items-center", className)}>
        <Card>
          <CardHeader>
            <CardTitle>{Title}</CardTitle>
            <CardDescription>{Description}</CardDescription>
          </CardHeader>
          <CardFooter className="flex gap-3">
            <Button variant="destructive" onClick={Callback}>
              {CallbackText}
            </Button>
            <Button variant="default" onClick={BackFunction}>
              Назад
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  },
);

ConfirmMessage.displayName = "ConfirmMessage";
export default ConfirmMessage;
