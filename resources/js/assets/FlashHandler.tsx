import { useEffect } from "react";
import { usePage } from "@inertiajs/react";
import { toast } from "@/hooks/use-toast";

const FlashHandler = () => {
    const { flash } = usePage().props as {
        flash?: { success?: string; error?: string };
    };

    useEffect(() => {
        if (flash?.success) {
            toast({
                title: "Success",
                description: flash.success,
                variant: "success", // Added success variant in toast component
            });
        }

        if (flash?.error) {
            toast({
                title: "Foutmelding",
                description: flash.error,
                variant: "destructive",
            });
        }
    }, [flash]);

    return null;
};

export default FlashHandler;
