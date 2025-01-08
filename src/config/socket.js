import socket from 'socket.io-client'

let socketInstance = null

const getToken=() =>{
    const allCookie = document.cookie
    const requiredCookie = allCookie.split(";").find((eachEle)=>{
        return eachEle.startsWith('token=')
    })
    const finalToken = requiredCookie.split('=')
    return finalToken[1]
}   

export const initializeSocket = (id) =>{

    const finalToken = getToken()
    socketInstance = socket(import.meta.env.VITE_SOCKET_URL,{
        transports: ["websocket"],
        auth : {
            token : finalToken
        },
        query: {
          projectId: id,
        }
    })
    return socketInstance
}