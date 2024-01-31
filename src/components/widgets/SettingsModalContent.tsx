"use client";

import { FC } from "react";
import { IModalContent } from "@/types/Modals.types";
import CustomModalContent from "@/components/ui/CustomModalContent";
import ThemeChangeButtons from "@/components/entity/ThemeChangeButtons";
import packageJSON from "@/../package.json";

const SettingsModalContent: FC<Pick<IModalContent, "type">> = ({ type }) => {
  return (
    <CustomModalContent title="Настройки" type={type}>
      <div className="min-h-[50dvh]">
        <ThemeChangeButtons />
      </div>
      <div className="w-full grid place-items-center opacity-50">
        Версия: {packageJSON.version}
      </div>
    </CustomModalContent>
  );
};

export default SettingsModalContent;
