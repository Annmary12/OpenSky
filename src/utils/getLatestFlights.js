export const latestFlight = flights => {
  const filterFlights = flights
    .filter(flight => flight.estDepartureAirport && flight.estArrivalAirport)
    .sort((a,b) => {
    return new Date(b.firstSeen) - new Date(a.firstSeen)
  })

  return filterFlights.slice(0,10);
}