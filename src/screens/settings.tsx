import React, { useContext } from "react";
import { Text, Button } from "react-native";
import { WeatherData } from "../context/context";

const Settings: React.FC = () => {
    const ctx = useContext(WeatherData);

    const setLocation = () => {
        ctx?.setLocation("Paris");
    };

    return (
        <>
            <Text>setting</Text>
            <Button onPress={setLocation} title={"location"}></Button>
        </>
    );
};

export default Settings;
