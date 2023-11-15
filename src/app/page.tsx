'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import cards from './db/cards.json';
import Button from './components/button';
import icon from './icon.png'
import Wallet from './components/Wallet';
import SelectJourney from './pages/select_journey/page';
import CustomInput from './components/CustomInput';
import ID from './pages/id/page';

const inter = Inter({ subsets: ['latin'] });

// Definir a interface para o tipo de carta
interface Card {
  id: number;
  property: string;
  photos: string;
  price: number;
  neighborhood: string;
  auction_value: number;
  increment: number;
  usableAreas: number;
  reform: number;
  min_market_value: number | null;
  max_market_value: number | null;
  show_market_value: boolean;
  regularization: boolean;
  regularization_value: number | null;
}

export default function Home() {
  const [debt, setDebt] = useState<number>(0)
  const [money, setMoney] = useState<number>(100000)
  const [interest, setInterest] = useState<number>(0)
  const [historicContext, setHistoricContext] = useState<string>("neutral")
  const [id, setId] = useState<number>(0)
  const [numberPlayers, setNumberPlayers] = useState<number>(5)
  const [match, setMatch] = useState<number>(1)
  const [page, setPage] = useState<string>("select_journey")
  const [journey, setJourney] = useState<string>("")

  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <Wallet debt={debt} money={money} pay={() => { }} ask={() => { }}></Wallet>
      {
        page === "select_journey" && (
          <SelectJourney
            auctioneer={() => {
              setJourney("auctioneer")
              setPage("id")
            }}
            bidder={() => {
              setJourney("bidder")
              setPage("id")
            }}
        />)
      }

      {
        page === "id" && (
          <ID saveID={(id) => setId(parseInt(id) + 1)} goToJourney={() =>setPage(journey)}/>
        )
      }

    </main>
  );
}