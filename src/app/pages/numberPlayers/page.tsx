import CustomInput from "@/app/components/CustomInput";
import Button from "@/app/components/button";
import { useState } from "react";

interface NumberProps {
    numberPlayers: (players: number[]) => void;
    goToAuction: () => void;
}

function gerarArray(numero: number): number[] {
    return Array.from({ length: numero }, (_, index) => index + 1);
}

export default function NumberPlayers({ goToAuction, numberPlayers }: NumberProps) {
    const [number, setNumber] = useState<number>()
    return (
        <div className="flex flex-grow flex-col items-center py-20">
            <CustomInput
                label="Numero de arrematantes"
                minValue={5}
                maxValue={8}
                value={number ? `${number}` : ""} // Pass the id state as the value
                onChange={(value) => {
                    if ((Number(value) >= 5 && Number(value) <= 8) || value === "") {
                        setNumber(Number(value))
                    }
                }} // Pass the value directly
                placeholder="Digite o numero de arrematantes"
            />
            <Button
                color="bg-[#ffca6e]"
                textSize=""
                onClick={() => {
                    number && numberPlayers(gerarArray(number))
                    goToAuction()
                }}
                altCss="w-full"
            >Próximo</Button>
        </div>
    )
}