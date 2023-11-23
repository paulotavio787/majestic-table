'use client'
import Button from "@/app/components/button";
interface SelectProps {
    auctioneer: () => void;
    bidder: () => void;
    goTo: (page: string) => void;
    sell: boolean;
  }

export default function SelectJourney({auctioneer, bidder, sell, goTo}: SelectProps ) {
    return (
        <div className="flex flex-grow text-white flex-col w-full items-center justify-center gap-5">
            <div className="flex text-white flex-row w-full items-center justify-between">
                <Button
                    color="bg-[#ffca6e]"
                    textSize=""
                    onClick={bidder}
                    altCss="rounded-l-none h-48 px-2"
                >
                    Arrematante
                </Button>
                <Button 
                    color="bg-[#ffca6e]" 
                    textSize=""
                    onClick={auctioneer} 
                    altCss="rounded-r-none h-48 px-5"
                >
                Leiloeiro
                </Button>
            </div>
            {sell && (<Button 
                color="bg-green-500" 
                textSize=""
                onClick={() => goTo("sell")} 
                altCss=""
            >
                Vender Propriedades
            </Button>)}
        </div>
    )
}