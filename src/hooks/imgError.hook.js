import { useState } from "react";
import img from './error.gif';

export const useImgError = () => {

    const [isImgError, setIsImgError] = useState(false);

    const onImgError = () => {
        setIsImgError(true);
    }
    
    const imgErrorUrl = img;   

    return {onImgError, imgErrorUrl, isImgError};
}

