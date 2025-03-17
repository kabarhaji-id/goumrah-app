"use client";

import { motion } from "framer-motion";
import Lottie from "lottie-react";
import loadingAnimation from "@/anims/loading.json"; // Pastikan file JSON ada di folder public

const Loading = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 "
        >
            <Lottie animationData={loadingAnimation} loop autoplay className="w-40 h-40" />
        </motion.div>
    );
};

export default Loading;
