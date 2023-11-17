'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import cards from './db/cards.json';
import Button from './components/button';
import icon from './icon.png'
import Wallet from './components/Wallet';
import SelectJourney from './pages/select_journey/selectJourney';
import CustomInput from './components/CustomInput';
import ID from './pages/id/id';
import NumberPlayers from './pages/numberPlayers/numberPlayers';
import Auction from './pages/auction/auction';
import AuctionResult from './pages/auctionResult/auctionResult';
import Bidder from './pages/bidder/bidder';
import Reform from './pages/reform/reform';
import Selling from './pages/selling/selling';

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
  const [money, setMoney] = useState<number>(1000000)
  const [interest, setInterest] = useState<number>(0)
  const [historicContext, setHistoricContext] = useState<number>(0)
  const [id, setId] = useState<number>(0)
  const [numberPlayers, setNumberPlayers] = useState<number[]>([1, 2, 3, 4, 5])
  const [match, setMatch] = useState<number>(0)
  const [page, setPage] = useState<string>("select_journey")
  const [journey, setJourney] = useState<string>("")
  const [playerWinner, setPlayerWinner] = useState<number | null>(null)
  const [winningPrice, setWinningPrice] = useState<number | null>(null)
  const [reform, setReform] = useState<boolean>(false)
  const [debts, setDebts] = useState<number[]>([0])
  useEffect(() => {    
    if (debt < money) {
      setDebt(debt - money)
      setMoney(money - debt)
    }
  }, [money])
  useEffect(() => {
    console.log("debt: ", debt);
    debt < 0 && setDebt(0)   
  }, [debt])
  useEffect(() => {
    if (money < 0) {
      console.log(money);
      let debtsVar = [...debts, Math.abs(money)]
      
      setDebts(debtsVar)
      console.log("var: ", debtsVar);
      setMoney(0)
    } else {
      setDebts(debts.map((item) => item * 1.1))
    }
    match % 5 === 0 && match > 0 && setMoney(money + 100000)
  }, [match])
  useEffect(() => {
    console.log("debts: ", debts);
    setDebt(debts.reduce((total, numero) => total + numero, 0))
  }, [debts])

  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <Wallet goTo={() => setPage("select_journey")} debt={debt} money={money} pay={() => { }} ask={() => { }} defineGameMode={(gameMode) => setHistoricContext(gameMode)}></Wallet>
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
          <ID saveID={(id) => setId(Number(id) + 1)} goToJourney={() => setPage(journey)} />
        )
      }

      {
        page === "auctioneer" && (
          <NumberPlayers numberPlayers={(players) => { setNumberPlayers(players) }} goToAuction={() => setPage("auction")} />
        )
      }

      {
        page === "auction" && (
          <Auction 
            numberPlayers={numberPlayers} id={id} 
            goToAuctionResult={(player, price) => {
              console.log(player);

              if (player && price) {
                setPlayerWinner(player)
                setWinningPrice(price)
                setMoney((0.1 * price) + money)
                setPage("auction_result")
              } else {
                setPage("select_journey")
              }
            }}
            gameMode={historicContext} 
          />
        )
      }

      {
        page === "auction_result" && (
          <AuctionResult playerWinner={playerWinner} winningPrice={winningPrice} goTo={() => {
            setMatch(match + 1)
            setPage("select_journey")
          }} />
        )
      }


      {
        page === "bidder" && (
          <Bidder id={id} gameMode={historicContext} goTo={(win, price) => {
            if (win) {
              setWinningPrice(price)
              price && setMoney(money - price)
              setPage("reform")
            } else {
              setMatch(match + 1)
              setPage("select_journey")
            }
          } }/>
        )
      }

      {
        page === "reform" && (
          <Reform id={id} gameMode={historicContext} 
            goTo={(reform, reformPrice) => {
              setReform(reform)
              reform && setMoney(money - reformPrice)
              setPage("selling")
          } }/>
        )
      }

      {
        page == "selling" && (
          <Selling id={id} goTo={(win, price) =>{
            setMatch(match + 1)
            if (win){
              price && setMoney(money + price)
              setPage("select_journey")
            } else {
              setPage("select_journey")
            }
          }} gameMode={historicContext} price={winningPrice} reform={reform}/>
        )
      }
    </main>
  );
}