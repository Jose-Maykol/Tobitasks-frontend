import { io } from 'socket.io-client'
import { SOCKET_URL } from './config/config'

const URL: string = SOCKET_URL

export const socket = io(URL, { autoConnect: false })
