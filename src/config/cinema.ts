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

  // Utility method to generate a unique cinema ID
  private generateCinemaId(): string {
    return Date.now().toString(36);
  }
}

export { Cinema };
