"use client";

import { Button } from "@/components/ui/button";
import { URLList } from "@/utils/const";
import { supabase } from "@/utils/Supabase.init";
import { Dispatch, FC, SetStateAction } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ProfileModeState } from "@/types/Modals.types";

const ProfileButtons: FC<{
  setMode: Dispatch<SetStateAction<ProfileModeState>>;
}> = ({ setMode }) => {
  const { push } = useRouter();

  const LogOut = async () => {
    const loading = toast.loading("Выход из аккаунта");
    const { error } = await supabase.auth.signOut({ scope: "local" });

    if (error) return toast.error(error.message);

    toast.success("Успешный выход", { id: loading });
    push(URLList.front);
  };

  const DeleteAccount = async () => {
    const {
      data: { user },
      error: UserError,
    } = await supabase.auth.getUser();
    if (UserError || !user?.id)
      return toast.error(UserError?.message || "Ошибка");

    const { error: DeleteError } = await supabase.auth.admin.deleteUser(
      user?.id,
    );

    if (DeleteError) return toast.error(DeleteError.message);
    toast.success("Аккаунт удален");
    push(URLList.front);
  };
  const EditMode = () => {};

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
};

export default ProfileButtons;
