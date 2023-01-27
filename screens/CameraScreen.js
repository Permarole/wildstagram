import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { Camera } from "expo-camera";
import * as ImageManipulator from "expo-image-manipulator";

async function takePicture(cameraRef) {
    const pictureMetadata = await cameraRef.current.takePictureAsync();
    console.log("pictureMetada", pictureMetadata);
    console.log(
        await ImageManipulator.manipulateAsync(pictureMetadata.uri, [
            { resize: { width: 800 } },
        ])
    );
}

export default function CameraScreen() {
    const [hasPermission, setHasPermission] = useState(null);
    const cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No acces to camera</Text>;
    }
    return (
        <>
            <Camera style={styles.camera} ref={cameraRef} />
            <Button
                onPress={async () =>
                    hasPermission
                        ? takePicture(cameraRef)
                        : console.log("Permission needed")
                }
                title="Capture"
            />
        </>
    );
}

const styles = StyleSheet.create({
    camera: {
        flex: 1,
    },
});
