

import axios from "axios"



export async function uploadCheckPhoto({ file, model_id, onUploadProgress }: { file: Blob; model_id: number; onUploadProgress: Function }) {

    const formData = new FormData();
    formData.append("checkPhoto", file);
    formData.append("model_id", String(model_id));


    return await axios
        .post(process.env.NEXT_PUBLIC_BACKEND_URL + "api/upload_check_photo", formData, {
            onUploadProgress: (data) => onUploadProgress(data),
        })
        .then((response) => response.data);

}
export async function uploadTmpPublicPhoto({ file, filename, onUploadProgress }: { file: Blob; filename: string; onUploadProgress: Function }) {

    const formData = new FormData();
    formData.append("publicPhoto", file);
    formData.append("filename", filename);;


    return await axios
        .post(process.env.NEXT_PUBLIC_BACKEND_URL + "api/upload_tmp_public_photo", formData, {
            onUploadProgress: (data) => onUploadProgress(data),
        })
        .then((response) => response.data);

}
export async function uploadPublicPhoto({ files, filename, model_id }: { files: Blob[]; filename: string; model_id: number }) {

    const formData = new FormData();
    formData.append("publicPhoto", files[0]);
    formData.append("thumbnail", files[1]);
    formData.append("filename", filename);
    formData.append("model_id", String(model_id));
    return await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + "api/upload_public_photo", formData).then((response) => response.data);

}
export async function uploadPublicVideo({
    file,
    filename,
    model_id,
    onUploadProgress,
}: {
    file: Blob;
    filename: string;
    model_id: number;
    onUploadProgress: Function;
}) {

    const formData = new FormData();
    formData.append("publicVideo", file);
    formData.append("filename", filename);
    formData.append("model_id", String(model_id));
    return await axios
        .post(process.env.NEXT_PUBLIC_BACKEND_URL + "api/upload_public_video", formData, {
            onUploadProgress: (data) => onUploadProgress(data),
        })
        .then((response) => response.data);

}

