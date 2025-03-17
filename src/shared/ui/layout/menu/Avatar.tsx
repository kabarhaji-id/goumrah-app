import Image from "next/image";
import { LuUser } from "react-icons/lu";

interface AvatarProps {
    imageUrl?: string | null; // ✅ Terima null juga
}

export default function Avatar({ imageUrl }: AvatarProps) {
    return (
        <div className="w-8 h-8 rounded-full overflow-hidden bg-teal-100 flex items-center justify-center">
            {imageUrl ? (
                <Image
                    src={imageUrl}
                    alt="User Avatar"
                    width={32}
                    height={32}
                    className="object-cover"
                />
            ) : (
                <LuUser size={20} className="text-teal-600" />
            )}
        </div>
    );
}
