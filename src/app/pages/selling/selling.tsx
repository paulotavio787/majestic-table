'use client'
import Button from '@/app/components/button';
import cards from '../../db/cards.json'
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface AuctionProps {
    id: number;
    goTo: (win: boolean, price: number|null, dice: number) => void
    gameMode: number;
    price: number|null;
    reform: boolean
}

export default function Selling ({id, goTo, gameMode=0, price, reform}: AuctionProps) {
    const card = cards.find((item) => item.id === id);
    const [auctionValue, setAuctionValue] = useState<any>(card?.price)
    const[dice, setDice] =useState<number>(0)
    useEffect(() => {
        dice < 5 && setDice(5)
        dice > 95 && setDice(95)
    }, [dice])
    useEffect(() => {
        if(gameMode == 1){
            setAuctionValue(auctionValue * 0.8)
        } else if (gameMode === 2) {
            setAuctionValue(auctionValue *1.2)
        }

        if (reform) {
            setAuctionValue(auctionValue + card?.reform)
        }

        if (price) {
            price > auctionValue && setDice(Math.round(50-(((price/auctionValue)-1)*100)))
            price < auctionValue && setDice(Math.round(50+((1-(price/auctionValue))*100)))
            price === auctionValue && setDice(50)

        }
    }, [])
    return (
        <div className='flex w-full flex-grow h-full flex-col items-center justify-center px-3 py-10'>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-4xl w-full font-bold text-center">
                    Voce arrematou por <span className="text-[#D19E44]">{} tire menos que</span>
                </h1>
                <span className="text-[#D19E44] text-4xl w-full font-bold text-center"> {dice}</span>
                <h1 className="text-4xl w-full font-bold text-center">
                    para vender
                </h1>
            </div>
            <div className='flex w-full flex-row gap-3 self-start'>
                    <Button
                        color="bg-green-500"
                        textSize=""
                        onClick={() => {
                            goTo(true, auctionValue, dice)
                        }}
                        altCss="w-full"
                    >Venddido🤑</Button>
                    <Button
                        color="bg-red-500"
                        textSize=""
                        onClick={() => {
                            goTo(false, null, dice)
                        }}
                        altCss="w-full"
                    >Não Vendido😒</Button>
                </div>
        </div>
    )
}