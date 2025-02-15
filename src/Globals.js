import { NativeEventEmitter, NativeModules } from 'react-native';
const Sockets = NativeModules.TcpSockets;

let instanceNumber = 0;

function getInstanceNumber() {
    return instanceNumber++;
}

const nativeEventEmitter = new NativeEventEmitter(Sockets);

export { nativeEventEmitter, getInstanceNumber };
