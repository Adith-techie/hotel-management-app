export const BOOKING_EVENT = "booking-updated";
export const BOOKING_STORAGE_KEY = "hotelBooking";

export const roomOptions = [
  { value: "single", label: "101 - Single Room", nightlyRate: 2500 },
  { value: "double", label: "204 - Deluxe Suite", nightlyRate: 3500 },
  { value: "family", label: "305 - Family Room", nightlyRate: 4800 },
  { value: "premium", label: "410 - Premium Suite", nightlyRate: 6500 },
];

export const defaultBooking = {
  userName: "Guest User",
  roomType: "double",
  checkIn: "2026-06-12",
  checkOut: "2026-06-15",
  guests: 2,
  status: "confirmed",
  serviceCharges: {
    housekeeping: 0,
    roomService: 0,
    frontDesk: 0,
  },
};

export const statusLabels = {
  confirmed: "Confirmed",
  service: "Service Requested",
  cancelled: "Cancelled",
};

export function getRoomOption(roomType) {
  return roomOptions.find((room) => room.value === roomType) || roomOptions[0];
}

export function getNightCount(checkIn, checkOut) {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diff = end.getTime() - start.getTime();

  if (Number.isNaN(diff) || diff <= 0) {
    return 1;
  }

  return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export function calculateBooking(booking) {
  const room = getRoomOption(booking.roomType);
  const nights = getNightCount(booking.checkIn, booking.checkOut);
  const guests = Number(booking.guests) || 1;
  const roomCharges = room.nightlyRate * nights;
  const extraGuestCharges = Math.max(0, guests - 2) * 500 * nights;
  const serviceCharges = Object.values(booking.serviceCharges || {}).reduce(
    (total, value) => total + (Number(value) || 0),
    0
  );
  const total = booking.status === "cancelled" ? 0 : roomCharges + extraGuestCharges + serviceCharges;

  return {
    room,
    nights,
    guests,
    roomCharges,
    extraGuestCharges,
    serviceCharges,
    total,
  };
}

export function formatCurrency(amount) {
  return `₹${Number(amount).toLocaleString("en-IN")}`;
}

export function normalizeBooking(booking) {
  return {
    ...defaultBooking,
    ...booking,
    guests: Math.max(1, Number(booking?.guests) || defaultBooking.guests),
    serviceCharges: {
      ...defaultBooking.serviceCharges,
      ...(booking?.serviceCharges || {}),
    },
  };
}

export function getBooking() {
  try {
    const storedBooking = localStorage.getItem(BOOKING_STORAGE_KEY);
    return storedBooking ? normalizeBooking(JSON.parse(storedBooking)) : defaultBooking;
  } catch {
    return defaultBooking;
  }
}

export function saveBooking(nextBooking) {
  const booking = normalizeBooking(nextBooking);
  localStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(booking));
  window.dispatchEvent(new CustomEvent(BOOKING_EVENT, { detail: booking }));
  return booking;
}

export function subscribeBooking(callback) {
  const handleUpdate = (event) => {
    callback(event.detail || getBooking());
  };

  const handleStorage = (event) => {
    if (event.key === BOOKING_STORAGE_KEY) {
      callback(getBooking());
    }
  };

  window.addEventListener(BOOKING_EVENT, handleUpdate);
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener(BOOKING_EVENT, handleUpdate);
    window.removeEventListener("storage", handleStorage);
  };
}

