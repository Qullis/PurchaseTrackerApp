import { Camera, CameraResultType } from '@capacitor/camera';


class PhotoService {
    constructor() {

    }



    takePicture = async () => {
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.Base64
        });

        // image.webPath will contain a path that can be set as an image src.
        // You can access the original file using image.path, which can be 
        // passed to the Filesystem API to read the raw data of the image,
        // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
        
        var imageData = image.base64String;

        // Can be set to the src of an image now
        //imageElement.src = imageUrl;
        return imageData;
    };
}

export default PhotoService;