"use client";

import { FC } from "react";
import { IModalContent } from "@/types/Modals.type";
import CustomModalContent from "@/components/ui/CustomModalContent";

const SettingsModalContent: FC<Pick<IModalContent, "type">> = ({ type }) => {
  return (
    <CustomModalContent title="Настройки" type={type}>
      <h1>Huy</h1>
    </CustomModalContent>
  );
};

export default SettingsModalContent;
