"use client";

import { FC, useState } from "react";
import { TProfileModalContent } from "@/types/Modals.type";
import CustomModalContent from "@/components/ui/CustomModalContent";
import { Button } from "@/components/ui/button";
import { DrawerFooter } from "@/components/ui/drawer";
import { DialogFooter } from "@/components/ui/dialog";
import { supabase } from "@/utils/Supabase.init";
import { useRouter } from "next/navigation";
import { URLList } from "@/utils/const";
import toast from "react-hot-toast";
import ConfirmMessage, {
  IConfirmMessage,
} from "@/components/entity/CongirmMessage";
import ProfileDefaultModalContent from "@/components/entity/ProfileDefaultModalContent";
import { AnimatePresence, motion } from "framer-motion";

const ProfileModalContent: FC<TProfileModalContent> = ({
  type,
  name,
  avatar,
  createdAt,
  email,
  lastSignIn,
}) => {
  const { push } = useRouter();
  const [Mode, setMode] = useState<
    (IConfirmMessage & { name: "confirm" }) | { name: "default" }
  >({
    name: "default",
  });

  const LogOut = () => {
    toast
      .promise(supabase.auth.signOut({ scope: "local" }), {
        loading: "Выход...",
        success: () => {
          push(URLList.front);
          return "Успешный выход";
        },
        error: (e) => `Ошибка - ${e.message}`,
      })
      .catch((e) => console.log(e));
  };

  const DeleteAccount = () => {
    console.log("delete user");
  };
  const EditMode = () => {};

  const BackToMain = () => setMode({ name: "default" });

  const Buttons = (
    <>
      <Button variant="outline">Изменить</Button>
      <Button
        variant="secondary"
        onClick={() =>
          setMode({
            name: "confirm",
            BackFunction: BackToMain,
            Title: "Выход",
            Description: "Вы уверены, что хотите выйти из аккаунта?",
            CallbackText: "Выйти",
            Callback: LogOut,
          })
        }
      >
        Выйти
      </Button>
      <Button
        variant="destructive"
        onClick={() =>
          setMode({
            name: "confirm",
            BackFunction: BackToMain,
            Callback: DeleteAccount,
            CallbackText: "Удалить",
            Description:
              "Вы уверены, что хотите удалить свой аккаунт? Отменить действие будет невозможно",
            Title: "Удаление",
          })
        }
      >
        Удалить
      </Button>
    </>
  );
  const MotionProfileDefaultModalContent = motion(ProfileDefaultModalContent);
  const MotionConfirmMessage = motion(ConfirmMessage);

  const Drawerfooter = (
    <DrawerFooter>
      <div className="w-full flex justify-center items-center gap-4">
        {Buttons}
      </div>
    </DrawerFooter>
  );
  const Dialogfooter = <DialogFooter>{Buttons}</DialogFooter>;
  const footer = type === "Drawer" ? Drawerfooter : Dialogfooter;

  return (
    <>
      <AnimatePresence initial={false} mode="wait">
        {Mode.name === "default" && (
          <MotionProfileDefaultModalContent
            key="default"
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -200, opacity: 0 }}
            transition={{ duration: 0.1 }}
            name={name}
            createdAt={createdAt}
            footer={footer}
            avatar={avatar}
            type={type}
            lastSignIn={lastSignIn}
            email={email}
          />
        )}
        {Mode.name === "confirm" && (
          <CustomModalContent
            key="profile"
            title="Профиль"
            type={type}
            AnotherFooter={<div></div>}
          >
            <MotionConfirmMessage
              className="w-full h-full"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ duration: 0.1 }}
              BackFunction={Mode.BackFunction}
              Callback={Mode.Callback}
              CallbackText={Mode.CallbackText}
              Description={Mode.Description}
              Title={Mode.Title}
            />
          </CustomModalContent>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProfileModalContent;
