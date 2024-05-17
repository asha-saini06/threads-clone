import { useState } from "react"
import useShowToast from "./useShowToast";


const usePreviewImg = () => {
    const [imgUrl, setImgUrl] = useState(null);
    const showToast = useShowToast();

    const handleImageChange = (e) => {
        const file = e.target.files[0]; // Get the selected file from the input element

        // console.log(file);
        if (file && file.type.startsWith("image/")) { // Check if the file is an image
            const reader = new FileReader(); // Create a new instance of FileReader

            reader.onloadend = () => {
                setImgUrl(reader.result); // Set the image URL for preview
            }; // Define a callback function for when file reading is completed

            reader.readAsDataURL(file);  // Read the file as a base64 data URL
        } else {
            showToast("Error", "Please select an image file", "error");
            setImgUrl(null); // Set the image URL to null if the file is not an image
        } // Display an error message if the file is not an image
    };

    return { handleImageChange, imgUrl, setImgUrl }
}

export default usePreviewImg