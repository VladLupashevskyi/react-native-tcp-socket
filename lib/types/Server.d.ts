/**
 * @extends {EventEmitter<'connection' | 'listening' | 'error' | 'close', any>}
 */
export default class Server extends EventEmitter<"error" | "close" | "connection" | "listening", any> {
    /**
     * @param {(socket: TcpSocket) => void} [connectionCallback] Automatically set as a listener for the `'connection'` event.
     */
    constructor(connectionCallback?: ((socket: TcpSocket) => void) | undefined);
    /** @private */
    private _id;
    /** @private */
    private _eventEmitter;
    /** @private @type {TcpSocket[]} */
    private _connections;
    /** @private */
    private _localAddress;
    /** @private */
    private _localPort;
    /** @private */
    private _localFamily;
    listening: boolean;
    /**
     * Start a server listening for connections.
     *
     * This function is asynchronous. When the server starts listening, the `'listening'` event will be emitted.
     * The last parameter `callback` will be added as a listener for the `'listening'` event.
     *
     * The `server.listen()` method can be called again if and only if there was an error during the first
     * `server.listen()` call or `server.close()` has been called. Otherwise, an `ERR_SERVER_ALREADY_LISTEN`
     * error will be thrown.
     *
     * @param {{ port: number; host: string; reuseAddress?: boolean}} options
     * @param {() => void} [callback]
     * @returns {Server}
     */
    listen(options: {
        port: number;
        host: string;
        reuseAddress?: boolean;
    }, callback?: (() => void) | undefined): Server;
    /**
     * Asynchronously get the number of concurrent connections on the server.
     *
     * Callback should take two arguments `err` and `count`.
     *
     * @param {(err: Error | null, count: number) => void} callback
     * @returns {Server}
     */
    getConnections(callback: (err: Error | null, count: number) => void): Server;
    /**
     * Stops the server from accepting new connections and keeps existing connections.
     * This function is asynchronous, the server is finally closed when all connections are ended and the server emits a `'close'` event.
     * The optional callback will be called once the `'close'` event occurs. Unlike that event, it will be called with an `Error` as its
     * only argument if the server was not open when it was closed.
     *
     * @param {(err?: Error) => void} [callback] Called when the server is closed.
     * @returns {Server}
     */
    close(callback?: ((err?: Error | undefined) => void) | undefined): Server;
    /**
     * Returns the bound `address`, the address `family` name, and `port` of the server as reported by the operating system if listening
     * on an IP socket (useful to find which port was assigned when getting an OS-assigned address):
     * `{ port: 12346, family: 'IPv4', address: '127.0.0.1' }`.
     *
     * @returns {import('./TcpSocket').AddressInfo | null}
     */
    address(): import('./TcpSocket').AddressInfo | null;
    ref(): Server;
    unref(): Server;
    /**
     * @private
     */
    private _registerEvents;
    _errorListener: import("react-native").EmitterSubscription | undefined;
    _closeListener: import("react-native").EmitterSubscription | undefined;
    _connectionsListener: import("react-native").EmitterSubscription | undefined;
    /**
     * @private
     */
    private _unregisterEvents;
    /**
     * @private
     */
    private _setDisconnected;
    /**
     * @private
     * @param {{ id: number; connection: import('./TcpSocket').NativeConnectionInfo; }} info
     */
    private _buildSocket;
}
import EventEmitter from "eventemitter3";
import TcpSocket from "./TcpSocket";
