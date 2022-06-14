import React from "react";
import { useTranslation } from "react-i18next";
import { Text } from "react-native";

const Meteogram: React.FC = () => {
  const { t } = useTranslation();
  return <Text>{t("meteograms")}</Text>;
};

export default Meteogram;
