import { ReactNode } from "react";
import { DrawerHeader, DrawerTitle } from "@/components/ui/drawer";

export interface IModalContent {
  title: string;
  AnotherHeader?: ReactNode;
  AnotherFooter?: ReactNode;
  children?: ReactNode;
  type: "Drawer" | "Dialog";
}

export type TModalSubContent = Omit<IModalContent, "type"> & {
  HeaderComponent: typeof DrawerHeader;
  HeaderTitleComponent: typeof DrawerTitle;
};

export type TProfileModalContent = Pick<IModalContent, "type"> & {
  avatar?: string;
  name: string;
  email?: string;
  createdAt: string;
  lastSignIn?: string;
};
