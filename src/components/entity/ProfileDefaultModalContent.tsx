import { FC, forwardRef, LegacyRef, ReactNode } from "react";
import { TProfileModalContent } from "@/types/Modals.type";
import CustomModalContent from "@/components/ui/CustomModalContent";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PersonIcon } from "@radix-ui/react-icons";
import InfoPlaceHolder from "@/components/ui/InfoPlaceHolder";

const ProfileDefaultModalContent: FC<
  TProfileModalContent & { footer: ReactNode }
> = forwardRef(
  ({ type, avatar, footer, UserInfo }, ref: LegacyRef<HTMLDivElement>) => {
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
            {UserInfo.map((item) => (
              <InfoPlaceHolder
                key={item.Title}
                title={item.Title}
                text={item.Text || ""}
              />
            ))}
          </section>
        </div>
      </CustomModalContent>
    );
  },
);

ProfileDefaultModalContent.displayName = "ProfileDefaultModalContent";

export default ProfileDefaultModalContent;
