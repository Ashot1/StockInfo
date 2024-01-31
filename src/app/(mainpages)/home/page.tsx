import MainMenuDropDown from "@/components/module/MainMenuDropDown";
import { GetUser } from "@/actions/Account";

export default async function Info() {
  const { user, error } = await GetUser();

  if (error)
    return <div className="w-dvw h-dvh grid place-items-center">{error}</div>;

  return (
    <>
      <div className="flex justify-between 768p:justify-center animate-appearance">
        <span className="max-w-[50%]">
          <p className="opacity-50 text-xs 768p:text-sm 768p:text-center">
            Добро пожаловать
          </p>
          <p className="truncate 768p:text-lg 768p:text-center">
            {user?.user_metadata.full_name}
          </p>
        </span>
        <span className="768p:hidden">
          <MainMenuDropDown />
        </span>
      </div>
    </>
  );
}
