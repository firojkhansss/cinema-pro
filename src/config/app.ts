import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Cinema } from "./cinema";
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
const cinema = new Cinema();

// API endpoint for creating a new cinema with N seats
app.post("/cinema", (req: Request, res: Response) => {
  const { seats } = req.body;
  const cinemaId = cinema.createCinema(seats);
  res.json({ cinemaId });
});

// API endpoint for purchasing a specific seat number in cinema C
app.post(
  "/cinema/:cinemaId/purchase/:seatNumber",
  async (req: Request, res: Response) => {
    const { cinemaId, seatNumber } = req.params;
    const result = await cinema.purchaseSeat(cinemaId, parseInt(seatNumber));
    res.json(result);
  }
);

// API endpoint for purchasing the first two free consecutive seats in cinema C
app.post("/cinema/:cinemaId/purchase", async (req: Request, res: Response) => {
  const { cinemaId } = req.params;
  const result = await cinema.purchaseConsecutiveSeats(cinemaId);
  res.json(result);
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}!`);
});
