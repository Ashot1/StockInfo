"use client";

import { FC } from "react";
import { IModalContent } from "@/types/Modals.type";
import CustomModalContent from "@/components/ui/CustomModalContent";
import ThemeChangeButtons from "@/components/entity/ThemeChangeButtons";

const SettingsModalContent: FC<Pick<IModalContent, "type">> = ({ type }) => {
  return (
    <CustomModalContent title="Настройки" type={type}>
      <div className="min-h-[50dvh]">
        <ThemeChangeButtons />
      </div>
    </CustomModalContent>
  );
};

export default SettingsModalContent;
