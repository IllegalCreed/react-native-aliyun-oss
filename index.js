import {DeviceEventEmitter, NativeEventEmitter, NativeModules, Platform} from "react-native";
const {AliyunOSS} = NativeModules;

let subscription;

//default configuration for OSS Client
const conf = {
    maxRetryCount: 3,
    timeoutIntervalForRequest: 30,
    timeoutIntervalForResource: 24 * 60 * 60
};

export default NativeAliyunOSS = {

    //Enable dev mode
    enableDevMode() {
        AliyunOSS.enableDevMode();
    },

    /**
     * Initialize the OSS Client
     * Mode: PlainTextAKSK
     */
    initWithPlainTextAccessKey(accessKey, secretKey, endPoint, configuration = conf) {
        AliyunOSS.initWithPlainTextAccessKey(accessKey, secretKey, endPoint, configuration);
    },

    /**
     * Initialize the OSS Client
     * Mode: ImplementedSigner
     */
    initWithImplementedSigner(signature, accessKey, endPoint, configuration = conf) {
        AliyunOSS.initWithImplementedSigner(signature, accessKey, endPoint, configuration);
    },

    /**
     * Initialize the OSS Client
     * Mode: SecurityToken (STS)
     */
    initWithSecurityToken(securityToken, accessKey, secretKey, endPoint, configuration = conf) {
        AliyunOSS.initWithSecurityToken(securityToken, accessKey, secretKey, endPoint, configuration);
    },

    /**
     * Asynchronously uploading
     */
    asyncUpload(bucketName, objectKey, filepath) {
        return AliyunOSS.asyncUpload(bucketName, objectKey, filepath);
    },

    /**
     * Asynchronously downloading
     */
    asyncDownload(bucketName, objectKey, filepath = null) {
        return AliyunOSS.asyncDownload(bucketName, objectKey, filepath);
    },

    /**
     * event listener for native upload/download event
     * @param event one of 'uploadProgress' or 'downloadProgress'
     * @param callback a callback function accepts one params: event
     */
    addEventListener(event, callback) {
        const RNAliyunEmitter = Platform.OS === 'ios' ? new NativeEventEmitter(AliyunOSS) : new DeviceEventEmitter(AliyunOSS);
        switch (event) {
            case 'uploadProgress':
                subscription = RNAliyunEmitter.addListener(
                    'uploadProgress',
                    e => callback(e)
                );
                break;
            case 'downloadProgress':
                subscription = RNAliyunEmitter.addListener(
                    'downloadProgress',
                    e => callback(e)
                );
                break;
            default:
                break;
        }
    },

    /**
     * remove event listener for native upload/download event
     * @param event one of 'uploadProgress' or 'downloadProgress'
     */
    removeEventListener(event) {
        switch (event) {
            case 'uploadProgress':
                subscription.remove();
                break;
            case 'downloadProgress':
                subscription.remove();
                break;
            default:
                break;
        }
    }
};