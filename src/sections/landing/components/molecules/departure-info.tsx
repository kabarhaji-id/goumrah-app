import moment from "moment";
import { CalendarDaysIcon } from "lucide-react";
import {DepartureDates} from "@/modules/landing/domain/landingModel";
import {useMemo} from "react";
import {getDepartureDate} from "@/shared/libs/utils";

const DepartureInfo: React.FC<{ departureDate: DepartureDates[] }> = ({ departureDate }) => {
    const filteredDate = useMemo(() => getDepartureDate(departureDate), [departureDate]);

    const hasMultipleDates = departureDate.length > 1;
    const additionalDates = hasMultipleDates ? departureDate.length - 6 : 0;

    return (
        <div className="relative space-y-2 text-[13px] leading-[18px] tracking-tight text-neutral-foreground opacity-80">
            <div className="flex items-center gap-2">
                <CalendarDaysIcon className="h-4 w-4 stroke-neutral-foreground" />
                <span className="font-medium tracking-wide">
                     {filteredDate ? moment(filteredDate.date).format("DD MMMM YYYY") : "TBA"}
                </span>
                {hasMultipleDates && additionalDates > 0 && (
                    <span className="text-xs leading-[18px] tracking-wide opacity-60">
                        +{additionalDates} tanggal lainnya
                    </span>
                )}
            </div>
        </div>
    );
};

export default DepartureInfo;
