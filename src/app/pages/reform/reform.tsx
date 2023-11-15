'use client'
import Button from '@/app/components/button';
import cards from '../../db/cards.json'

interface ReformProps {
    id: number;
    goTo: (reformed: boolean, reformPrice: number) => void
    gameMode: number|null
}


export default function Reform({ id, gameMode, goTo }: ReformProps) {
    const card = cards.find((item) => item.id === id);
    return (
        <div className='flex flex-col flex-grow h-full w-full justify-center items-center gap-16 px-10'>
            <Button
                color="bg-[#ffca6e]"
                textSize=""
                onClick={() => {
                    goTo(true, card?.reform ? card.reform : 0)
                }}
                altCss="w-full"
            >
                Reformar $ {card?.reform}
            </Button>
            <Button
                color="bg-[#ffca6e]"
                textSize=""
                onClick={() => {
                    goTo(true, 0)
                }}
                altCss="w-full"
            >
                Não Reformar
            </Button>
        </div>
    )
}