import React from "react";
import { useTranslation } from "react-i18next";
import { Text } from "react-native";

const Weather: React.FC = () => {
  const { t } = useTranslation();
  return <Text>{t("weather")}</Text>;
};

export default Weather;
