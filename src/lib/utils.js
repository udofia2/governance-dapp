import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { isAddress } from "viem";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export const shortenAddress = (address, length) => {
    if (!isAddress(address)) return "";

    return `${address.slice(0, length + 2)}...${address.slice(
        address.length - length
    )}`;
};
