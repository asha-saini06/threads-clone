import { useToast } from "@chakra-ui/react"
import { useCallback } from "react";

export const useShowToast = () => {
    const toast = useToast()
    const showToast = useCallback((title, description, status) => {
        toast({
            title,
            description,
            status,
            duration: 3000,
            isClosable: true,
        });
    }, [toast]) // useCallback to prevent re-rendering on every call

    return showToast
};

export default useShowToast