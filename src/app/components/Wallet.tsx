import Image from "next/image";
import icon from "../icon.png"

interface WalletProps {
    debt: number;
    money: number;
    pay: () => void;
    ask: () => void;
  }
  
  export default function Wallet({ debt, money, pay, ask }: WalletProps) {
    return (
      <div className="bg-gray-700 flex flex-col justify-center items-center w-full">
        <div className="flex justify-center items-center w-full bg-gray-900 py-1 rounded-b-lg">
            <Image src={icon} alt="logo majestic" className="w-5"/>
        </div>
        <div className="flex flex-row justify-between w-full px-5">
            <a className="text-red-600 font-semibold" onClick={pay}>- ${`${debt}`}</a>
            <a className="text-green-600 font-semibold" onClick={ask}>+ ${`${money}`}</a>
        </div>
      </div>
    );
  }