import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TextStyle, View, ViewStyle } from "react-native";

const Meteogram: React.FC<{ textStyle: TextStyle; bgStyle: ViewStyle }> = (
    props
) => {
    const { t } = useTranslation();
    return (
        <View>
            <Text style={props.textStyle}>{t("meteograms")}</Text>
        </View>
    );
};

export default Meteogram;
