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
import { useMatchMedia } from "@/hooks/MatchMedia";
import {
  Share1Icon,
  GearIcon,
  QuestionMarkCircledIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { DialogTriggerProps } from "@radix-ui/react-dialog";
import { IconProps } from "@radix-ui/react-icons/dist/types";
import { AuthContext, TUser } from "@/hoc/AuthProvider";
import { useRouter } from "next/navigation";
import { URLList } from "@/utils/const";
import SettingsModalContent from "@/components/entity/SettingsModalContent";
import ProfileModalContent from "@/components/entity/ProfileModalContent";

type ContentType = null | "profile" | "settings" | "editProfile";

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
  const user = useContext(AuthContext);
  const { push } = useRouter();

  const Buttons: TButtons = [
    {
      text: "Профиль",
      img: PersonIcon,
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
    {
      text: "Информация",
      img: QuestionMarkCircledIcon,
      click: () => push(URLList.front),
      dopClass: center,
      triggered: false,
    },
  ];

  return isMobile ? (
    <DrawerMenu Buttons={Buttons} ModalContent={ModalContent} user={user} />
  ) : (
    <DialogMenu Buttons={Buttons} ModalContent={ModalContent} user={user} />
  );
}

const DialogMenu: FC<{
  Buttons: TButtons;
  ModalContent: ContentType;
  user: TUser;
}> = ({
  Buttons,
  ModalContent,
  user: { email, created_at, last_sign_in_at, user_metadata },
}) => {
  return (
    <Dialog>
      <TripleDropDown>
        <GenerateButtons Buttons={Buttons} Trigger={DialogTrigger} />
      </TripleDropDown>
      <DialogContent>
        {ModalContent === "settings" ? (
          <SettingsModalContent type="Dialog" />
        ) : (
          <ProfileModalContent
            type="Dialog"
            email={email}
            name={user_metadata?.full_name}
            createdAt={created_at}
            lastSignIn={last_sign_in_at}
            avatar={user_metadata?.avatar_url}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

const DrawerMenu: FC<{
  Buttons: TButtons;
  ModalContent: ContentType;
  user: TUser;
}> = ({
  Buttons,
  ModalContent,
  user: { email, created_at, last_sign_in_at, user_metadata },
}) => {
  return (
    <Drawer>
      <TripleDropDown>
        <GenerateButtons Buttons={Buttons} Trigger={DrawerTrigger} />
      </TripleDropDown>
      <DrawerContent>
        {ModalContent === "settings" ? (
          <SettingsModalContent type="Drawer" />
        ) : (
          <ProfileModalContent
            type="Drawer"
            email={email}
            name={user_metadata?.full_name}
            createdAt={created_at}
            lastSignIn={last_sign_in_at}
            avatar={user_metadata?.avatar_url}
          />
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
