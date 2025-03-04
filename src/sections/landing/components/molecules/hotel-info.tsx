import PackageDetailItem from "@/sections/landing/components/molecules/package-detail-item";

interface HotelInfoProps {
    location: string;
    hotelName: string;
    rating: number;
}

const HotelInfo: React.FC<HotelInfoProps> = ({location, hotelName, rating}) => {
    return (<div className="flex items-center gap-2">
            <PackageDetailItem
                icon="hotel"
                label={location}
                value={hotelName}
                starRating={rating} // Hotel icon remains 38x23
            />


        </div>

    );
};

export default HotelInfo;
