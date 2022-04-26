import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import Head from 'next/head'
import Image from 'next/image'
import Card from '../components/cards'
import styles from '../styles/Home.module.css'
import MySocket from '../src/MySocket';

export default function Home() {
  const [players, setPlayers] = useState([])
  const [questions, setQuestions] = useState([])
  const [nextBtnVisible, setNextBtnVisible] = useState(false)
  const [shuffleBtnVisible, setShuffleBtnVisible] = useState(true)

  const socketInstance = MySocket.getInstance()
  const socket = socketInstance.socket;
  const questionStore = useSelector((state) => state.gameReducer.questions) || []

  useEffect(() => {
    socket.emit('list-players', replay => {
      console.log('list-players', replay)
    })
  }, [])

  useEffect(() => {
    socket.on("packet", ({ type, data }) => {
      console.log('packet: ', type, data)
    });

    socket.on("listed-players", (data) => {
      console.log('listed-players: ', data)
      setPlayers(data)
    });

    socket.on("start-play", (data) => {
      console.log('start-play: ')
      router.push('/play')
    });

    socket.on("turn", (data) => {
      console.log('turn play: ', data)
      console.log('turn play data length: ')
      console.log(data.length)

      setQuestions(data)

      if (data.length === 0) {
        setShuffleBtnVisible(false)
      }
    });

    socket.on("question-selected", (data) => {
      console.log('question-selected: ', data)
      setQuestions([data.question])
      setShuffleBtnVisible(false)
      setNextBtnVisible(true)
      // selectQuestion(data.question)
    });
  }, [socket])

  useEffect(() => {
    setQuestions([...questionStore])
  }, [questionStore])

  function selectQuestion(question) {
    const tmpArr = []
    for (let index = 0; index < questionStore.length; index++) {
      const item = questionStore[index];

      if (item === question) {
        tmpArr.push(question)
      }
    }

    setQuestions(tmpArr)
    socket.emit('select-question', { question: question })
    setShuffleBtnVisible(false)
    setNextBtnVisible(true)
  }

  function nextTurn() {
    socket.emit('next-turn')
  }

  function shuffle() {
    socket.emit('shuffle')
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={[styles.main, "relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-rose-100 to-teal-100"]}>
        <div className="flex flex-col justify-center w-6/12 bg-white p-8">
          <div className="flex text-xl font-bold">Players:</div>
          <div className="flex flex-1 pl-8 mt-4">
            <ol className='text-lg'>
              {players.map((item, index) => {
                return <li key={index}>{item.name}</li>
              })}
            </ol>
          </div>
          <div className="flex flex-row space-x-4 my-4 h-80">
            {questions.map((item, index) => {
              return <Card question={item} key={index} onClick={() => selectQuestion(item)} />
            })
            }
          </div>
          <div className="flex flex-row space-x-4 my-4 justify-center">
            Click to Draw a Card
          </div>
          <div className="flex flex-row space-x-4 my-4">
            {shuffleBtnVisible ? (
              <button
                onClick={() => shuffle()}
                className="bg-red-400 text-white rounded-md hover:bg-red-500 font-semibold px-4 py-3"
              >
                Shuffle
              </button>
            ) : (
              <div></div>
            )}

            {nextBtnVisible ? (
              <button
                onClick={() => nextTurn()}
                className="bg-red-400 text-white rounded-md hover:bg-red-500 font-semibold px-4 py-3"
              >
                Next Turn
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </div>

      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}
