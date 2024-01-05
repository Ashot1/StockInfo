"use client";

import { FC, ReactNode } from "react";
import { DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";

export interface ISettingsModal {
  AnotherHeader?: ReactNode;
  AnotherFooter?: ReactNode;
  children?: ReactNode;
  type: "Drawer" | "Dialog";
}

const SettingsContent: FC<ISettingsModal> = ({
  children,
  AnotherFooter,
  AnotherHeader,
  type,
}) => {
  const types = {
    Drawer: (
      <Drawer AnotherFooter={AnotherFooter} AnotherHeader={AnotherHeader}>
        {children}
      </Drawer>
    ),
    Dialog: (
      <Modal AnotherFooter={AnotherHeader} AnotherHeader={AnotherHeader}>
        {children}
      </Modal>
    ),
  };
  return types[type];
};

export default SettingsContent;

const Drawer: FC<Omit<ISettingsModal, "type">> = ({
  AnotherHeader,
  AnotherFooter,
  children,
}) => {
  return (
    <>
      {AnotherHeader ? (
        AnotherHeader
      ) : (
        <DrawerHeader>
          <DrawerTitle>Настройки</DrawerTitle>
        </DrawerHeader>
      )}
    </>
  );
};

const Modal: FC<Omit<ISettingsModal, "type">> = ({
  children,
  AnotherHeader,
  AnotherFooter,
}) => {
  return (
    <>
      {AnotherHeader ? (
        AnotherHeader
      ) : (
        <DialogHeader>
          <DialogTitle>Настройки</DialogTitle>
        </DialogHeader>
      )}
    </>
  );
};
