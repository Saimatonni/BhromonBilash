import {getStorage,ref,getDownloadURL,uploadBytesResumable} from "firebase/storage"

export const uploadPhotoToFirebase =async (imageDatabase64 : string,userId : string) => {
    const storage = getStorage()
    const storageRef = ref(storage, `profilePhotos/${userId}`);

    const buffer = Buffer.from(imageDatabase64,"base64")

    const metadata = {
        contentType : "image/png"
    }

     // Upload the file in the bucket storage
     const snapshot = await uploadBytesResumable(storageRef,buffer, metadata);
     //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

     // Grab the public url
     const downloadURL = await getDownloadURL(snapshot.ref);

     return downloadURL
}