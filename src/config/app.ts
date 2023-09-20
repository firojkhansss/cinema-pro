
import express, { Request, Response} from "express"
import bodyParser from "body-parser"
import cors  from "cors"
const app = express()
// here is the demo

const port = 3000

app.use(bodyParser.json())
app.use(cors())

app.listen(port, () =>{
     console.log(`Example app listening on port http://localhost:${port}!`)
    })