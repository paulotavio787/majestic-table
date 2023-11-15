'use client'
import Button from "@/app/components/button";

interface WinnerProps {
    winningPrice: number|null;
    playerWinner: number|null;
    goTo: () => void;
}

export default function AuctionResult({playerWinner, winningPrice, goTo}: WinnerProps) {
    return (
        <div className="flex flex-grow w-full items-center justify-center px-1">
            <h1 className="text-3xl font-bold text-center">
                O arrematante <span className="text-[#D19E44]">{playerWinner}</span> arrematou por <span className="text-[#D19E44]">$ {winningPrice}</span>
            </h1>

            <Button
                color="bg-[#ffca6e]"
                textSize=""
                onClick={goTo}
                altCss="w-full"
            >Continuar</Button>
        </div>
    )
}