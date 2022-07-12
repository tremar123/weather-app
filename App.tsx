import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTranslation } from "react-i18next";

import "./assets/i18n/i18n";
import Meteogram from "./src/screens/meteogram";
import Weather from "./src/screens/weather";
import { WeatherDataProvider } from "./src/context/context";
import Settings from "./src/screens/settings";

const Tab = createBottomTabNavigator();

const App: React.FC = () => {
    const { t } = useTranslation();

    return (
        <WeatherDataProvider>
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
        </WeatherDataProvider>
    );
};

export default App;
