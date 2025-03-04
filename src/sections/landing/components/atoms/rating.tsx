import {Building2Icon, StarIcon} from "lucide-react"; // Using Lucide for icons

interface RatingProps {
    starsRating: number; // Expected rating (e.g., 1-5)
}

const Rating: React.FC<RatingProps> = ({ starsRating }) => {
    const totalStars = 5; // Assuming max rating is 5

    return (
        <div className="flex items-center gap-1 rounded-lg bg-blue-100 px-2 py-1 text-sm font-medium text-blue-800">
            <Building2Icon className="h-4 w-4"/>
            <StarIcon className="h-4 w-4 fill-yellow-500 stroke-none"/>
            <span>{totalStars}</span>
        </div>
    );
};

export default Rating;
