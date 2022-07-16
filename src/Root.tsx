import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTranslation } from "react-i18next";
import NetInfo from "@react-native-community/netinfo";
import React, { useContext, useEffect } from "react";

import Meteogram from "./screens/meteogram";
import Weather from "./screens/weather";
import { WeatherData } from "./context/context";
import Settings from "./screens/settings";
import "../assets/i18n/i18n";

const Tab = createBottomTabNavigator();

const Root: React.FC = () => {
    const { t } = useTranslation();
    const ctx = useContext(WeatherData);

    // should I use useEffect here?
    useEffect(() => {
        ctx?.updateLocationFromLocalStorage();
        NetInfo.fetch().then((state) => {
            if (!state.isConnected) {
                ctx?.fetchData();
                console.log("fetching from internet");
            } else {
                console.log("updating from local");
                ctx?.updateDataFromLocalStorage();
            }
        });
    }, []);

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarIconStyle: { display: "none" },
                }}
            >
                <Tab.Screen name={t("weather")} component={Weather} />
                <Tab.Screen name={t("meteograms")} component={Meteogram} />
                <Tab.Screen name={t("settings")} component={Settings} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default Root;
