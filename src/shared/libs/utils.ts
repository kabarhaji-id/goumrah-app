import moment from "moment";
import "moment/locale/id";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {DepartureDates} from "@/modules/landing/domain/landingModel";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getDepartureDate(departureDates: DepartureDates[]): DepartureDates | undefined {
    return departureDates.find((departure) => departure.status === "active") ?? departureDates[0];
}

// 🔹 Format harga ke Rupiah (bisa pilih simbol mata uang)
export function formatPrice(price: number, currency: string = "Rp") {
    return `${currency} ${price.toLocaleString("id-ID")}`;
}

// 🔹 Hitung diskon dalam persen
export function calculateDiscountPercentage(
    normalPrice: number,
    discountedPrice: number,
    decimalPlaces: number = 0 // Bisa atur jumlah desimal
): string {
    if (normalPrice <= 0 || discountedPrice <= 0 || discountedPrice > normalPrice) {
        return "Invalid prices";
    }
    const discountPercent = ((normalPrice - discountedPrice) / normalPrice) * 100;
    return `${discountPercent.toFixed(decimalPlaces)}%`;
}

// 🔹 Hitung jumlah uang yang dihemat
export function calculateAmountSaved(
    normalPrice: number,
    discountedPrice: number
): string {
    if (normalPrice <= 0 || discountedPrice <= 0 || discountedPrice > normalPrice) {
        return "Invalid prices";
    }

    const saved = normalPrice - discountedPrice;
    return saved >= 1_000_000
        ? `Hemat ${(saved / 1_000_000).toFixed(1)} juta`
        : `Hemat ${(saved / 1_000).toFixed(1)} ribu`;
}

// 🔹 Hitung harga setelah diskon
export function calculatePriceAfterDiscount(
    normalPrice: number,
    discountPercent: number
): number {
    if (normalPrice <= 0 || discountPercent <= 0 || discountPercent > 100) {
        return normalPrice;
    }
    return normalPrice - (normalPrice * discountPercent) / 100;
}

// 🔹 Kapitalisasi kata pertama
export function capitalize(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

// 🔹 Hitung durasi penerbangan (Format input bisa diubah)
export function getFlightDuration(
    departureTime: string,
    landingTime: string,
    format: string = "HH:mm"
): string {
    const departure = moment(departureTime, format);
    const landing = moment(landingTime, format);

    if (!departure.isValid() || !landing.isValid()) return "Invalid time format";

    if (landing.isBefore(departure)) {
        landing.add(1, "day");
    }

    const duration = moment.duration(landing.diff(departure));
    return `${duration.hours()}j ${duration.minutes()}m`;
}

// 🔹 Hitung rata-rata rating dengan fleksibilitas desimal
export function getAverageRating(ratings: number[], decimalPlaces: number = 1) {
    if (!ratings.length) return "No ratings";
    const avg = ratings.reduce((acc, val) => acc + val, 0) / ratings.length;
    return avg.toFixed(decimalPlaces);
}

// 🔹 Hitung jumlah hari & malam dari tanggal check-in dan check-out
export function getStayDuration(checkIn?: string, checkOut?: string) {
    if (!checkIn || !checkOut) return "Tanggal tidak lengkap";

    moment.locale("id");
    const checkInDate = moment(checkIn, "YYYY-MM-DD");
    const checkOutDate = moment(checkOut, "YYYY-MM-DD");

    if (!checkInDate.isValid() || !checkOutDate.isValid()) return "Invalid date";

    const totalDays = checkOutDate.diff(checkInDate, "days");
    return totalDays > 0 ? `${totalDays} hari ${totalDays - 1} malam` : "1 hari 0 malam";
}

// 🔹 Format diskon (Bisa disesuaikan)
export function formatDiscount(discount: number) {
    if (discount >= 1_000_000) return `${(discount / 1_000_000).toFixed(1)}jt`;
    if (discount >= 1_000) return `${(discount / 1_000).toFixed(1)}rb`;
    return discount.toString();
}

// 🔹 Hitung jadwal ketibaan pesawat berdasarkan durasi
export function getArrivalTime(
    departureDate: string,
    durationInMinutes?: number
) {
    if (!departureDate || !durationInMinutes) return "Invalid input";
    return moment(departureDate).add(durationInMinutes, "minutes").toISOString();
}

// 🔹 Format durasi dari menit ke jam & menit
export function formatDuration(duration?: number) {
    if (!duration || duration < 0) return "Invalid duration";

    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}j ${minutes}m`;
}

// 🔹 Hitung durasi transit antara dua penerbangan
export function getTransitDuration(
    arrivalTime: string,
    nextDepartureTime: string
) {
    if (!arrivalTime || !nextDepartureTime) return "Invalid input";

    const arrival = moment(arrivalTime);
    const departure = moment(nextDepartureTime);

    if (!arrival.isValid() || !departure.isValid()) return "Invalid date format";

    const transitMinutes = departure.diff(arrival, "minutes");
    return formatDuration(transitMinutes);
}

// 🔹 Konversi jarak (Meter ke Kilometer atau Teks Khusus)
export function formatDistance(distanceInMeters: number, customText?: string): string {
    if (distanceInMeters < 0) throw new Error("Jarak tidak boleh negatif");

    if (customText) return customText;
    return distanceInMeters >= 1000
        ? `${(distanceInMeters / 1000).toFixed(1)} km`
        : `${distanceInMeters} m`;
}
