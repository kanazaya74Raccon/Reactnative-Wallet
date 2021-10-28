// Barcode and QR Code Scanner using Camera in React Native
// https://aboutreact.com/react-native-scan-qr-code/

// import React in our code
import React, { useState } from 'react';

// import all the components we are going to use
import {
    SafeAreaView,
    Text,
    View,
    Linking,
    TouchableHighlight,
    PermissionsAndroid,
    Platform,
    StyleSheet,
    Dimensions
} from 'react-native';
const { height, width } = Dimensions.get('window');
// import CameraKitCameraScreen
import { CameraKitCameraScreen } from 'react-native-camera-kit';

const scanqr = () => {
    const [qrvalue, setQrvalue] = useState('');
    const [opneScanner, setOpneScanner] = useState(true);

    const onOpenlink = () => {
        // If scanned then function to open URL in Browser
        Linking.openURL(qrvalue);
    };

    const onBarcodeScan = (qrvalue) => {
        // Called after te successful scanning of QRCode/Barcode
        setQrvalue(qrvalue);
        setOpneScanner(false);
    };

    const onOpneScanner = () => {
        // To Start Scanning
        if (Platform.OS === 'android') {
            async function requestCameraPermission() {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.CAMERA,
                        {
                            title: 'Camera Permission',
                            message: 'App needs permission for camera access',
                        },
                    );
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        // If CAMERA Permission is granted
                        setQrvalue('');
                        setOpneScanner(true);
                    } else {
                        alert('CAMERA permission denied');
                    }
                } catch (err) {
                    alert('Camera permission err', err);
                    console.warn(err);
                }
            }
            // Calling the camera permission function
            requestCameraPermission();
        } else {
            setQrvalue('');
            setOpneScanner(true);
        }
    };
   
    return (
        <SafeAreaView style={{ top: 20 }}>
            <View style={{ height: height }}>
                <CameraKitCameraScreen
                    showFrame={true}
                    // Show/hide scan frame
                    scanBarcode={true}
                    // Can restrict for the QR Code only
                    laserColor={'blue'}
                    // Color can be of your choice
                    frameColor={'white'}
                    // If frame is visible then frame color
                    colorForScannerFrame={'black'}
                    // Scanner Frame color
                    onReadCode={(event) =>
                        onBarcodeScan(event.nativeEvent.codeStringValue)
                    }
                />
            </View>

            <View style={styles.container}>

                <Text style={styles.textStyle}>
                    {qrvalue ? alert('Wallet Address: ' + JSON.stringify(qrvalue)) : ''}
                </Text>
                {/* {qrvalue.includes('https://') ||
                    qrvalue.includes('http://') ||
                    //qrvalue.includes('geo:') ? (
                        <TouchableHighlight onPress={onOpenlink}>
                            {/* <Text style={styles.textLinkStyle}>
                                {
                                    qrvalue.includes('geo:') ?
                                        'Open in Map' : 'Open Link'
                                }
                    //         </Text> */}
                {/* //     </TouchableHighlight>
                    // ) : null} */}
            </View>
        </SafeAreaView>
    );
};

export default scanqr;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        alignItems: 'center',

    },
    titleText: {
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    textStyle: {
        // color: 'black',
        fontSize: 16,
        //textAlign: 'center',
    },
    buttonStyle: {
        fontSize: 16,
        color: 'white',
        backgroundColor: 'green',
        minWidth: 250,
    },
    buttonTextStyle: {
        color: 'white',
        textAlign: 'center',
    },
    textLinkStyle: {
        color: 'blue',

    },
});