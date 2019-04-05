import { Socket } from "phoenix"
import circle from './circle'
import ppt from './ppt'

let socket = new Socket("/socket", {params: {user_id: window.userToken}})

ppt(socket)

export default socket
