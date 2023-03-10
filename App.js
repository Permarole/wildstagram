import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CameraScreen from "./screens/CameraScreen";
import FeedScreen from "./screens/FeedScreen";
import ImagesScreen from "./screens/ImagesScreen";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer style={styles.container}>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerTitleAlign: "center",
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        if (route.name === "Camera") {
                            iconName = focused ? "camera" : "camera-outline";
                        } else if (route.name === "Images") {
                            iconName = focused ? "image" : "image-outline";
                        } else if (route.name === "Feed") {
                            iconName = focused
                                ? "share-social"
                                : "share-social-outline";
                        }
                        return (
                            <Ionicons
                                name={iconName}
                                size={size}
                                color={color}
                            />
                        );
                    },
                    tabBarActiveTintColor: "blue",
                    tabBarInactiveTintColor: "gray",
                })}
            >
                <Tab.Screen
                    name="Camera"
                    component={CameraScreen}
                    options={{ unmountOnBlur: true }}
                />
                <Tab.Screen
                    name="Images"
                    component={ImagesScreen}
                    options={{ unmountOnBlur: true }}
                />
                <Tab.Screen name="Feed" component={FeedScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
