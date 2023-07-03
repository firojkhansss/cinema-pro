
import express, { Request, Response} from "express"
import bodyParser from "body-parser"
import cors  from "cors"
import {Cinema} from "./cinema"
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(cors())
const cinema = new Cinema()
app.post("/cinema", (req: Request, res: Response) => {
    const { seats } = req.body;
    const cinemaId = cinema.createCinema(seats);
    res.json({ cinemaId });
  });
app.listen(port, () =>{
     console.log(`Example app listening on port http://localhost:${port}!`)
    })