import { Lock } from "./lock";
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

  // Purchase the first two free consecutive seats in a cinema
  async purchaseConsecutiveSeats(cinemaId: string): Promise<any> {
    const cinema = this.getCinemaById(cinemaId);
    const seats = cinema.seats;

    for (let i = 0; i < seats.length - 1; i++) {
      const currentSeat = seats[i];
      const nextSeat = seats[i + 1];

      const currentLockKey = `${cinemaId}-${currentSeat.seatNumber}`;
      const nextLockKey = `${cinemaId}-${nextSeat.seatNumber}`;

      // Acquire locks for both seats
      await this.lock.acquire(currentLockKey);
      await this.lock.acquire(nextLockKey);

      if (!currentSeat.isOccupied && !nextSeat.isOccupied) {
        currentSeat.isOccupied = true;
        nextSeat.isOccupied = true;
        this.lock.release(currentLockKey);
        this.lock.release(nextLockKey);
        return { seats: [currentSeat.seatNumber, nextSeat.seatNumber] };
      }

      // Release locks if seats are not available
      this.lock.release(currentLockKey);
      this.lock.release(nextLockKey);
    }

    return { error: "No consecutive seats available" };
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
