'use client'
import CustomInput from "@/app/components/CustomInput";
import Button from "@/app/components/button";
import { useState } from "react";

interface SelectProps {
    saveID: (id: string) => void;
    goToJourney: () => void;
}

export default function ID({ saveID, goToJourney }: SelectProps) {
    const [id, setId] = useState<string>(""); // Initialize id with an empty string
    return (
        <div className="flex flex-grow flex-col w-full items-center px-[20%] py-20">
            <CustomInput
                label="ID"
                value={id} // Pass the id state as the value
                onChange={(value) => {
                    setId(value)
                    saveID(value)
                }} // Pass the value directly
                placeholder="Digite o id do imóvel"
            />
            <Button
                color="bg-[#ffca6e]"
                textSize=""
                onClick={goToJourney}
                altCss="w-full"
            >
                Próximo
            </Button>

        </div>
    );
}