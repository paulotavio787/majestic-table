import { useEffect, useState } from 'react';
import cards from '../../db/cards.json'
import { Dices, Landmark } from 'lucide-react';
import Button from '@/app/components/button';

interface PropertiesProps {
    properties: number[];
    dices: number[];
    gameModeProperties: number[];
    sell: (price: number, index: number) => void;
}

interface PropertiesObjectTypes {
    propertie: number | null,
    dice: number | null,
    price: number | null,
    gameMode: number | null
}

export default function Properties({ properties, dices, gameModeProperties, sell }: PropertiesProps) {
    const [propertiesObjects, setPropertiesObject] = useState<PropertiesObjectTypes[]>(
        properties.map((propertie, index) => {
            const card = cards.find((item) => item.id === propertie);
            let priceCard = card?.price ? card?.price : null
            if (gameModeProperties[index] == 1) {
                priceCard ? priceCard = priceCard * 0.8 : null
            } else if (gameModeProperties[index] === 2) {
                priceCard ? priceCard = priceCard * 1.2 : null
            }
            return {
                propertie: propertie,
                dice: dices[index],
                price: priceCard,
                gameMode: gameModeProperties[index]
            }
        })
    )
    return (
        <div className='flex flex-grow flex-col w-full h-full p-10 items-center justify-start'>
            {
                propertiesObjects.map((propertie, index) => (
                    <div className='flex flex-col bg-gray-800 px-2 pt-5 pb-2 w-full gap-y-5 items-center justify-between rounded-md'>
                        <div className='flex flex-row bg-gray-800 w-full items-center justify-between rounded-md'>
                            <div className='flex flex-row gap-2'>
                                <Landmark />
                                <p>{propertie.propertie && propertie.propertie - 1}</p>
                            </div>
                            {propertie.gameMode === 1 && (<p>🐻</p>)}
                            {propertie.gameMode === 2 && (<p>🐂</p>)}
                            <div className='flex flex-row gap-2'>
                                <Dices />
                                <p>{propertie.dice && propertie.dice}</p>
                            </div>
                        </div>
                        <Button
                            color="bg-green-500"
                            textSize=""
                            onClick={() => {
                                propertie.price && sell(propertie.price, index)
                                setPropertiesObject(propertiesObjects.filter((propertieObject, number) => number !== index))
                            }}
                            altCss="w-full"
                        >Venddido🤑</Button>
                    </div>
                ))
            }
        </div>
    )
}