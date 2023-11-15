'use client'
import Button from "@/app/components/button";

interface WinnerProps {
    winningPrice: number|null;
    playerWinner: number|null;
    goTo: () => void;
}

export default function AuctionResult({playerWinner, winningPrice, goTo}: WinnerProps) {
    return (
        <div className="flex flex-grow flex-col w-full items-center justify-center px-16 gap-4">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-4xl w-full font-bold text-center">
                    O arrematante <span className="text-[#D19E44]">{playerWinner}</span> arrematou por
                </h1>
                <span className="text-[#D19E44] text-4xl w-full font-bold text-center">$ {winningPrice}</span>

            </div>

            <Button
                color="bg-[#ffca6e]"
                textSize=""
                onClick={goTo}
                altCss="w-full"
            >Continusar</Button>
        </div>
    )
}