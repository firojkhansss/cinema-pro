import { Lock } from "./Lock";
interface Seat {
  seatNumber: number;
  isOccupied: boolean;
}

interface CinemaData {
  id: string;
  seats: Seat[];
}

class Cinema {
  private cinemas: CinemaData[] = [];
  private lock: Lock;

  constructor() {
    this.lock = new Lock(); // Initialize the lock for concurrency control
  }
  // Create a new cinema with N seats and return the cinema ID
  createCinema(seats: number): string {
    const cinemaId = this.generateCinemaId();
    const newCinema: CinemaData = {
      id: cinemaId,
      seats: Array(seats)
        .fill(null)
        .map((_, index) => ({
          seatNumber: index + 1,
          isOccupied: false,
        })),
    };
    this.cinemas.push(newCinema);
    return cinemaId;
  }

  // Purchase a specific seat number in a cinema
  async purchaseSeat(cinemaId: string, seatNumber: number): Promise<any> {
    const cinema = this.getCinemaById(cinemaId);
    const seat = this.getSeatByNumber(cinema, seatNumber);

    // Acquire the lock for the seat before making the purchase
    const lockKey = `${cinemaId}-${seatNumber}`;
    await this.lock.acquire(lockKey);

    if (seat.isOccupied) {
      // Seat is already purchased
      this.lock.release(lockKey);
      return { error: "Seat is already occupied" };
    }

    seat.isOccupied = true;
    this.lock.release(lockKey);

    return { seatNumber };
  }

  // Utility method to get a cinema by ID
  private getCinemaById(cinemaId: string): CinemaData {
    const cinema = this.cinemas.find((c) => c.id === cinemaId);
    if (!cinema) {
      throw new Error("Cinema not found");
    }
    return cinema;
  }
  // Utility method to get a seat by seat number
  private getSeatByNumber(cinema: CinemaData, seatNumber: number): Seat {
    const seat = cinema.seats.find((s) => s.seatNumber === seatNumber);
    if (!seat) {
      throw new Error("Seat not found");
    }
    return seat;
  }

  // Utility method to generate a unique cinema ID
  private generateCinemaId(): string {
    return Date.now().toString(36);
  }
}

export { Cinema };
