'use client'
import Button from '@/app/components/button';
import cards from '../../db/cards.json'
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface AuctionProps {
    id: number;
    goTo: (win: boolean, price: number|null) => void
    gameMode: number
}

export default function Bidder ({id, goTo, gameMode=0}: AuctionProps) {
    const card = cards.find((item) => item.id === id);
    const [auctionValue, setAuctionValue] = useState<any>(card?.auction_value)

    useEffect(() => {
        if(gameMode == 1){
            setAuctionValue(auctionValue * 0.8)
        } else if (gameMode === 2) {
            setAuctionValue(auctionValue *1.2)
        }
    }, [])
    return (
        <div className='flex w-full flex-grow h-full flex-col items-center justify-between px-3 py-10'>
            <div className='flex flex-col gap-5'>
                <img src={card?.photos} alt="" className='rounded-sm mb-5' />
                <div className=' flex flex-row w-full justify-between items-center'>
                    <p><span className='font-bold'>Preço: </span>${auctionValue}</p>
                    <p><span className='font-bold'>Incremento: </span>${card?.increment}</p>
                </div>
                <div className=' flex flex-row w-full justify-between items-center'>
                    <p><span className='font-bold'>Bairro: </span>{card?.neighborhood}</p>
                    <p><span className='font-bold'>Mercado: </span>{card?.show_market_value ? `$ ${card.min_market_value}-${card.max_market_value}` : "Tiro cego"}</p>
                </div>
                <div className=' flex flex-row w-full justify-between items-center'>
                    <p><span className='font-bold'>Área: </span>${card?.usableAreas}</p>
                    <p><span className='font-bold'>Reforma: </span>${card?.reform}</p>
                </div>
            </div>
            <div className='flex flex-col w-full gap-5'>
                <Button
                    color="bg-[#ffca6e]"
                    textSize=""
                    onClick={() => {
                        setAuctionValue(auctionValue + card?.increment)
                    }}
                    altCss="w-full"
                >
                    Lance $ {auctionValue + card?.increment}
                </Button>
                <div className='flex w-full flex-row gap-3 self-start'>
                    <Button
                        color="bg-green-500"
                        textSize=""
                        onClick={() => {
                            goTo(true, auctionValue)
                        }}
                        altCss="w-full"
                    >Arrematado🤑</Button>
                    <Button
                        color="bg-red-500"
                        textSize=""
                        onClick={() => {
                            goTo(false, null)
                        }}
                        altCss="w-full"
                    >Não arrematado😒</Button>
                </div>
            </div>
        </div>
    )
}