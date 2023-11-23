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
import Properties from './pages/properties/properties';

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
  const [properties, setProperties] = useState<number[]>([])
  const [dices, setDices] = useState<number[]>([])
  const [gameModesProperties, setGameModesProperties] = useState<number[]>([])
  const [sell, setSell] = useState<boolean>(false)
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
  const [debtsMatch, setDebtsMatch] = useState<number[]>([0])

  useEffect(() => {
    if (match > 0 && match % 5 === 0) {
      setMoney(money + 100000) 
      setSell(true)
    } else {
      setSell(false)
    }
    let debtVar = debt
    debts.length > 1 && debts.map(item => debtVar += item)
    setDebt(debtVar)
    if (money < 0) {
      let debtsVar = [...debts, Math.abs(Math.round(money * 0.1))]
      setDebts(debtsVar)
      let debtsMatchVar = [...debtsMatch, match]
      setDebtsMatch(debtsMatchVar)
      setDebt(debt + Math.abs(money))
      setMoney(0)
    }
  }, [match])
  useEffect(() => {
    let moneyVar = money
    let debtsVar = debts
    let debtsMatchVar = debtsMatch
    let debtVar = debt
    console.log("money: ", money);
    console.log("debts: ", debts);
    console.log("debtsMatch: ", debtsMatch);
    console.log("debt: ", debt);
    console.log("match: ", match);
    
    
    if (debts.length > 1) {
      debts.map((item, index) => {
        if (item > 0) {
          let totalDebt = (item * 10) + (item * (match - debtsMatch[index] - (debtsMatch.length - 2)))
          if (money >= totalDebt) {
            moneyVar -= totalDebt
            debtsVar = debtsVar.filter((debt, number) => number !== index)
            console.log(debtsVar);
            debtsMatchVar = debtsMatchVar.filter((debt, number) => number !== index)
            debtVar -= totalDebt
          }
        }
      })
      setMoney(moneyVar)
      setDebts(debtsVar)
      setDebtsMatch(debtsMatchVar)
      setDebt(debtVar)
      console.log("--------------");
    }
  }, [money])

  useEffect(() => {
    console.log(debts);
  }, [debts])
  
  useEffect(() => {
    console.log("divida: ", debt);
    console.log("--------------------");
    
    if (debt < 0) {
      setMoney(money + Math.abs(debt))
      setDebt(0)
    }
  }, [debt])

  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <Wallet goTo={() => setPage("select_journey")} debt={debt} money={money} pay={() => { }} ask={() => { }} defineGameMode={(gameMode) => setHistoricContext(gameMode)}></Wallet>
      {
        page === "select_journey" && (
          <SelectJourney
            sell={sell}
            auctioneer={() => {
              setJourney("auctioneer")
              setPage("id")
            }}
            bidder={() => {
              setJourney("bidder")
              setPage("id")
            }}
            goTo={(page) => {setPage("sell")}}
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
          <Selling id={id} goTo={(win, price, dice) =>{
            setMatch(match + 1)
            if (win){
              price && setMoney(money + price)
              setPage("select_journey")
            } else {
              const varDices = [...dices, dice]
              setDices(varDices)
              const varProperties = [...properties, id]
              setProperties(varProperties)
              const varGameModeProperties = [...gameModesProperties, historicContext]
              setGameModesProperties(varGameModeProperties)
              setPage("select_journey")
            }
          }} gameMode={historicContext} price={winningPrice} reform={reform}/>
        )
      }

      {
        page === "sell" && (
          <Properties gameModeProperties={gameModesProperties} dices={dices} properties={properties} sell={(price, index) => {
            setMoney(money + price)
            setProperties(properties.filter((propertie, number) => number !== index))
            setDices(dices.filter((dice, number) => number !== index))
            setGameModesProperties(gameModesProperties.filter((gameMode, number) => number !== index))
          }}/>
        )
      }
    </main>
  );
}