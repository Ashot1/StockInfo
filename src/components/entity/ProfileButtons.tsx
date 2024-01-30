"use client";

import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/Supabase.init";
import { Dispatch, FC, SetStateAction } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ProfileModeState } from "@/types/Modals.types";
import { DeleteUser } from "@/actions/Account";

const ProfileButtons: FC<{
  setMode: Dispatch<SetStateAction<ProfileModeState>>;
}> = ({ setMode }) => {
  const { refresh } = useRouter();

  // выход из аккаунта
  const LogOut = async () => {
    const loading = toast.loading("Выход из аккаунта");
    const { error } = await supabase.auth.signOut({ scope: "local" });

    if (error) return toast.error(error.message);

    toast.success("Успешный выход", { id: loading });
    refresh();
  };

  // удаление аккаунта
  const DeleteAccount = async () => {
    const res = await DeleteUser();
    if (res?.error) return toast.error((res.error as string) || "Ошибка");
    refresh();
  };

  // переключение в режим редактирования
  const EditMode = () => {};

  // возвращение на главную
  const BackToMain = () => setMode({ name: "default" });

  return (
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
            CallbackText: "Удалить",
            action: DeleteAccount,
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
};

export default ProfileButtons;
