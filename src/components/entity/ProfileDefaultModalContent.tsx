import {
  DetailedHTMLProps,
  FC,
  forwardRef,
  HTMLAttributes,
  LegacyRef,
  ReactNode,
} from "react";
import { TProfileModalContent } from "@/types/Modals.type";
import CustomModalContent from "@/components/ui/CustomModalContent";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PersonIcon } from "@radix-ui/react-icons";
import InfoPlaceHolder from "@/components/ui/InfoPlaceHolder";

const ProfileDefaultModalContent: FC<
  TProfileModalContent & { footer: ReactNode }
> = forwardRef(
  (
    { type, email, name, avatar, createdAt, lastSignIn, footer },
    ref: LegacyRef<HTMLDivElement>,
  ) => {
    return (
      <CustomModalContent title="Профиль" type={type} AnotherFooter={footer}>
        <div className="overflow-y-auto" ref={ref}>
          <aside className="w-full grid place-items-center mt-3">
            {avatar ? (
              <Avatar className="size-14">
                <AvatarImage src={avatar} />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
            ) : (
              <PersonIcon className="size-12" />
            )}
          </aside>
          <section className="w-full px-4 flex flex-col gap-4 mt-5 mb-5">
            <InfoPlaceHolder title="Имя" text={name} />
            {email && <InfoPlaceHolder title="Email" text={email} />}
            {lastSignIn && (
              <InfoPlaceHolder title="Последний вход" text={lastSignIn} />
            )}
            {createdAt && (
              <InfoPlaceHolder title="Зарегистрирован" text={createdAt} />
            )}
          </section>
        </div>
      </CustomModalContent>
    );
  },
);

ProfileDefaultModalContent.displayName = "ProfileDefaultModalContent";

export default ProfileDefaultModalContent;
