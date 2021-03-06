import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router';
import { Socket } from 'socket.io-client';
import MySocket from '../src/MySocket';
import { useSelector, useDispatch } from 'react-redux'
import { setQuestion } from '../src/state/game-slice'

export default function Home() {
  const router = useRouter()
  const socketInstance = MySocket.getInstance()
  const socket = socketInstance.socket;
  const [joined, setJoined] = useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
    socket.emit('check-room', replay => {
      console.log('replay', replay)
    })
  }, [])

  useEffect(() => {
    socket.on("packet", ({ type, data }) => {
      console.log('packet: ', type, data)
    });
  
    socket.on("joined", (data) => {
      console.log('joinded: ', data)
      setJoined(data.total)
    });
  
    socket.on("room-checked", (data) => {
      console.log('room-checked: ', data)

      if (data == 3) {
        router.push('/play')
      } else {
        setJoined(data)
      }
    });

    socket.on("start-play", (data) => {
      console.log('start-play: ')
      router.push('/play')
    });

    socket.on("turn", (data) => {
      console.log('turn play: ', data)
      dispatch(setQuestion(data))
    });

  }, [socket])

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={[styles.main, "relative flex min-h-screen flex-col justify-center bg-gradient-to-r from-rose-100 to-teal-100"]}>
        <div className="flex items-center justify-center h-screen">
          <div className="bg-white rounded-2xl border shadow-x1 p-10 max-w-lg">
            <div className="flex flex-col items-center space-y-4">
              <h1 className="font-bold text-2xl text-gray-700 w-full text-center">
                Waiting for player
              </h1>
              <p className="font-bold text-2xl text-gray-700 w-4/6 text-center">
                {joined}/3
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
