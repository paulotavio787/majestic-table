'use client'
import Image from "next/image";
import icon from "../icon.png"
import { useEffect, useState } from "react";

interface WalletProps {
    debt: number;
    money: number;
    pay: () => void;
    ask: () => void;
    defineGameMode: (gameMode: number) => void
  }
  
  export default function Wallet({ debt, money, pay, ask, defineGameMode}: WalletProps) {
    const [gameMode, setGameMode] = useState<number>(0)
    useEffect(() => {
      defineGameMode(gameMode)
    }, [gameMode])
    return (
      <div className="bg-gray-700 flex flex-col justify-center items-center w-full">
        <div className="flex justify-center items-center w-full bg-gray-900 py-1 rounded-b-lg">
            <Image src={icon} alt="logo majestic" className="w-5"/>
        </div>
        <div className="flex flex-row justify-between w-full px-5">
            <a className="text-red-600 font-semibold" onClick={pay}>- ${`${debt}`}</a>
            <div className="flex flex-row gap-5">
              <button 
                className={`text-md ${gameMode == 1 && "bg-white"}`}
                onClick={() => gameMode != 1 ? setGameMode(1) : setGameMode(0)}
              >🐻</button>
              <button 
                className={`text-md ${gameMode == 2 && "bg-white"}`}
                onClick={() => gameMode != 2 ? setGameMode(2) : setGameMode(0)}  
              >🐂</button>
            </div>
            <a className="text-green-600 font-semibold" onClick={ask}>+ ${`${money}`}</a>
        </div>
      </div>
    );
  }