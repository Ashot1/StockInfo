"use client";

import { FC, useContext } from "react";
import { TProfileModalContent } from "@/types/Modals.type";
import CustomModalContent from "@/components/ui/CustomModalContent";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { PersonIcon } from "@radix-ui/react-icons";
import InfoPlaceHolder from "@/components/ui/InfoPlaceHolder";
import { Button } from "@/components/ui/button";
import { DrawerFooter } from "@/components/ui/drawer";
import { DialogFooter } from "@/components/ui/dialog";
import { supabase } from "@/utils/Supabase.init";
import { useRouter } from "next/navigation";
import { URLList } from "@/utils/const";

const ProfileModalContent: FC<TProfileModalContent> = ({
  type,
  name,
  avatar,
  createdAt,
  email,
  lastSignIn,
}) => {
  const { push } = useRouter();
  const LogOut = () => {
    supabase.auth
      .signOut({ scope: "local" })
      .then((Response) => console.log(Response))
      .catch((e) => console.log(e.message));
    push(URLList.front);
  };
  const Buttons = (
    <>
      <Button variant="outline">Изменить</Button>
      <Button variant="secondary" onClick={LogOut}>
        Выйти
      </Button>
      <Button variant="destructive">Удалить</Button>
    </>
  );

  const Drawerfooter = <DrawerFooter>{Buttons}</DrawerFooter>;
  const Dialogfooter = (
    <DialogFooter className="w-full justify-center">{Buttons}</DialogFooter>
  );
  const footer = type === "Drawer" ? Drawerfooter : Dialogfooter;

  return (
    <CustomModalContent title="Профиль" type={type} AnotherFooter={footer}>
      <div className="w-full grid place-items-center mt-3">
        {avatar ? (
          <Avatar className="size-14">
            <AvatarImage src={avatar} /> :
          </Avatar>
        ) : (
          <PersonIcon className="size-12" />
        )}
      </div>
      <section className="w-full px-4 flex flex-col gap-4 mt-5 mb-16">
        <InfoPlaceHolder title="Имя" text={name} />
        {email && <InfoPlaceHolder title="Email" text={email} />}
        {lastSignIn && (
          <InfoPlaceHolder title="Последний вход" text={lastSignIn} />
        )}
        {createdAt && (
          <InfoPlaceHolder title="Зарегистрирован" text={createdAt} />
        )}
      </section>
    </CustomModalContent>
  );
};

export default ProfileModalContent;
