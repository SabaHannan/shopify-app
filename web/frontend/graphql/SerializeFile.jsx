export async function serialiseFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64String = reader.result;
            resolve(base64String);
        };

        reader.onerror = (error) => {
            reject(error);
        }

        reader.readAsDataURL(file);
    });
}