import React from 'react';
import { Price } from "@/modules/landing/domain/landingModel";
import CustomPercentWavyIcon from "@/public/icons/percent-wavy.svg";
import {formatPrice} from "@/shared/libs/utils";

interface PriceInfoProps {
    prices: Price;
}

const PriceInfo: React.FC<PriceInfoProps> = ({ prices }) => {
    return (<div className="flex flex-1 flex-col gap-1.5 text-primary-foreground">
            <div className="flex items-center gap-1 xs:gap-2">
                {/* --- Normal Price */}
                <p className="flex-shrink-0 text-base font-extrabold xs:text-[17.5px]">
                    {prices.quadFinalPrice
                        ? formatPrice(prices.quadFinalPrice)
                        : formatPrice(prices.quadPrice)}
                </p>

                {/* --- Discount Price */}
                {
                    prices.quadFinalPrice &&
                    prices.quadPrice !== prices.quadFinalPrice && (
                        <div className="flex flex-shrink-0 items-center gap-1">
                            <CustomPercentWavyIcon
                                className="h-3 w-3 xs:h-4 xs:w-4"
                                stroke="#EF4444"
                            />
                            <span className="text-[11px] leading-5 text-destructive line-through opacity-80 xs:text-sm">
                            {formatPrice(prices.quadPrice)}
                          </span>
                        </div>
                    )}
            </div>
        </div>);
}

export default PriceInfo;