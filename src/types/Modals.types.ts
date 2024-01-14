import { ReactNode } from "react";
import { DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { IConfirmMessage } from "@/components/entity/CongirmMessage";

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
  UserInfo: UserProfileInfo;
};

export type UserProfileInfo = {
  Title: string;
  Text: string | undefined;
  Editable: boolean;
}[];

export type ProfileModeState =
  | (IConfirmMessage & { name: "confirm" })
  | { name: "default" };
