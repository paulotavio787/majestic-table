'use client'
import Button from '@/app/components/button';
import cards from '../../db/cards.json'
import { useEffect, useState } from 'react';

interface AuctionProps {
    id: number;
    numberPlayers: number[];
    goToAuctionResult: (playerWin: number|null, winningPrice: number|null) => void;
    gameMode: number
}

export default function Auction ({id, numberPlayers, goToAuctionResult, gameMode}: AuctionProps) {
    const card = cards.find((item) => item.id === id);
    const [auctionValue, setAuctionValue] = useState<any>(card?.auction_value)
    const [player, setPlayer] = useState<number|null>(null)
    useEffect(() => {
        if(gameMode == 1){
            setAuctionValue(auctionValue * 0.8)
        } else if (gameMode === 2) {
            setAuctionValue(auctionValue *1.2)
        }
    }, [])
    return (
        <div className='flex w-full flex-grow flex-col items-center justify-around'>
            <h1 className='text-2xl'>$ {auctionValue}</h1>
            <div className='flex w-full flex-wrap items-center justify-center gap-3 gap-y-10'>
                {numberPlayers.map(player => {
                    return (
                        <Button
                            key={player}
                            color="bg-[#ffca6e]"
                            textSize=""
                            onClick={() => {
                                setPlayer(player)
                                setAuctionValue(auctionValue + card?.increment)
                            }}
                            altCss="w-1/5 py-6"
                        >{player}</Button>
                    )
                })}
            </div>
            <div className='flex w-full flex-row gap-3 px-3'>
                <Button
                    color="bg-green-500"
                    textSize=""
                    onClick={() => {
                        goToAuctionResult(player, auctionValue)
                    }}
                    altCss="w-full"
                >Arrematado🤑</Button>
                <Button
                    color="bg-red-500"
                    textSize=""
                    onClick={() => {
                        goToAuctionResult(null, null)
                    }}
                    altCss="w-full"
                >Sem lances😒</Button>
            </div>
        </div>
    )
}