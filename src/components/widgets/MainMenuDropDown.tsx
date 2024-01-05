"use client";

import {
  FC,
  ForwardRefExoticComponent,
  RefAttributes,
  useContext,
  useState,
} from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import TripleDropDown from "@/components/entity/TripleDropDown";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import SettingsContent from "@/components/entity/SettingsContent";
import { useMatchMedia } from "@/hooks/MatchMedia";
import { Share1Icon, GearIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { DialogTriggerProps } from "@radix-ui/react-dialog";
import { IconProps } from "@radix-ui/react-icons/dist/types";
import { AuthContext, TUser } from "@/hoc/AuthProvider";

type ContentType = null | "profile" | "settings";

type TButtons = {
  text: string;
  img:
    | string
    | ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
  click?: () => void;
  dopClass: string;
  triggered: boolean;
}[];

export default function MainMenuDropDown() {
  const center: string = "flex items-center gap-2.5";
  const [ModalContent, setModalContent] = useState<ContentType>(null);
  const isMobile = useMatchMedia(820);
  const { user_metadata } = useContext(AuthContext);

  const Buttons: TButtons = [
    {
      text: "Профиль",
      img: user_metadata.avatar_url || "",
      click: () => setModalContent("profile"),
      dopClass: center,
      triggered: true,
    },
    {
      text: "Настройки",
      img: GearIcon,
      click: () => setModalContent("settings"),
      dopClass: center,
      triggered: true,
    },
    {
      text: "Поделиться",
      img: Share1Icon,
      click: () => console.log("share"),
      dopClass: center,
      triggered: false,
    },
  ];

  return isMobile ? (
    <DrawerMenu Buttons={Buttons} ModalContent={ModalContent} />
  ) : (
    <DialogMenu Buttons={Buttons} ModalContent={ModalContent} />
  );
}

const DialogMenu: FC<{
  Buttons: TButtons;
  ModalContent: ContentType;
}> = ({ Buttons, ModalContent }) => {
  return (
    <Dialog>
      <TripleDropDown>
        <GenerateButtons Buttons={Buttons} Trigger={DialogTrigger} />
      </TripleDropDown>
      <DialogContent>
        {ModalContent === "settings" ? (
          <SettingsContent type="Dialog" />
        ) : (
          "profile"
        )}
      </DialogContent>
    </Dialog>
  );
};

const DrawerMenu: FC<{
  Buttons: TButtons;
  ModalContent: ContentType;
}> = ({ Buttons, ModalContent }) => {
  return (
    <Drawer>
      <TripleDropDown>
        <GenerateButtons Buttons={Buttons} Trigger={DrawerTrigger} />
      </TripleDropDown>
      <DrawerContent>
        {ModalContent === "settings" ? (
          <SettingsContent type="Drawer" />
        ) : (
          "profile"
        )}
      </DrawerContent>
    </Drawer>
  );
};

const GenerateButtons: FC<{
  Trigger: ForwardRefExoticComponent<
    DialogTriggerProps & RefAttributes<HTMLButtonElement>
  >;
  Buttons: TButtons;
}> = ({ Trigger, Buttons }) => {
  return Buttons.map((btn) => {
    const avatar =
      typeof btn.img === "string" ? (
        <Avatar className="size-4">
          <AvatarImage src={btn.img} />
        </Avatar>
      ) : (
        <btn.img className="size-4" />
      );

    if (btn.triggered) {
      return (
        <Trigger key={btn.text} asChild onClick={btn.click}>
          <DropdownMenuItem className={btn.dopClass}>
            {avatar}
            {btn.text}
          </DropdownMenuItem>
        </Trigger>
      );
    }
    return (
      <DropdownMenuItem
        key={btn.text}
        className={btn.dopClass}
        onClick={btn.click}
      >
        {avatar}
        {btn.text}
      </DropdownMenuItem>
    );
  });
};
