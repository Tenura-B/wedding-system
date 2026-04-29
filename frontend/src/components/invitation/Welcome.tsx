import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WelcomeProps {
    brideName: string;
    groomName: string;
    onOpen: () => void;
    template?: string;
}

export default function Welcome({ brideName, groomName, onOpen, template }: WelcomeProps) {
    const isDark = template === "luxury";
    const isFloral = template === "floral";

    // Scroll lock
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -100, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }}
            className={`fixed inset-0 z-[100] flex flex-col items-center justify-center p-0 overflow-hidden ${isDark ? 'bg-neutral-950 text-white' :
                isFloral ? 'bg-rose-50 text-neutral-900' :
                    'bg-white text-neutral-900'
                }`}
        >
            {/* Background decorative elements */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className={`absolute top-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] ${isDark ? 'bg-amber-500' : 'bg-rose-300'}`}
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className={`absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] ${isDark ? 'bg-neutral-700' : 'bg-amber-200'}`}
                />
            </div>

            {/* Floating Particles/Sparkles */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{
                        opacity: 0,
                        x: Math.random() * 100 - 50 + "%",
                        y: Math.random() * 100 - 50 + "%"
                    }}
                    animate={{
                        opacity: [0, 0.5, 0],
                        y: ["-10%", "110%"],
                        x: (Math.random() * 20 - 10) + "%"
                    }}
                    transition={{
                        duration: 5 + Math.random() * 10,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                        ease: "linear"
                    }}
                    className={`absolute w-1 h-1 rounded-full ${isDark ? 'bg-amber-400' : 'bg-rose-400'}`}
                />
            ))}



            {/* Main Image Content */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 w-full h-full flex flex-col items-center"
            >
                <div
                    className="w-full h-screen relative group cursor-pointer"
                    onClick={onOpen}
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2.5, ease: "easeOut" }}
                        className="w-full h-full overflow-hidden"
                    >
                        <img
                            src="/images/b1.jpeg"
                            className="w-full h-full object-cover grayscale(0.2) group-hover:grayscale-0 transition-all duration-1000"
                            alt="Welcome"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-1000" />
                    </motion.div>

                    {/* Static Top Logo */}
                    <img
                        src="/images/lop.png"
                        className="absolute -top-16 md:-top-2 left-0 w-full h-[70vh] md:h-[75vh] object-contain object-top pointer-events-none z-20 drop-shadow-[0_10px_30px_rgba(0,0,0,0.1)] origin-top scale-[1.9] md:scale-110"
                        alt="Logo"
                    />


                    {/* Centered Seal Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 -mt-16 md:-mt-24">
                        <motion.img
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                            src="/images/seal.webp"
                            className="w-56 md:w-80 object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
                            alt="Seal"
                        />
                    </div>
                </div>
            </motion.div>

            {/* Floral decorations if floral template */}
            {isFloral && (
                <>
                    <motion.img
                        initial={{ opacity: 0, rotate: 180, scale: 0.8, x: 50, y: -50 }}
                        animate={{ opacity: 0.3, rotate: 180, scale: 1, x: 0, y: 0 }}
                        transition={{ duration: 2.5, ease: "easeOut" }}
                        src="https://images.unsplash.com/photo-1555529731-118a8a46bd3b?w=400&auto=format&fit=crop"
                        className="absolute top-0 right-0 w-80 md:w-96 pointer-events-none"
                        alt=""
                    />
                    <motion.img
                        initial={{ opacity: 0, scale: 0.8, x: -50, y: 50 }}
                        animate={{ opacity: 0.3, scale: 1, x: 0, y: 0 }}
                        transition={{ duration: 2.5, ease: "easeOut" }}
                        src="https://images.unsplash.com/photo-1555529731-118a8a46bd3b?w=400&auto=format&fit=crop"
                        className="absolute bottom-0 left-0 w-80 md:w-96 pointer-events-none"
                        alt=""
                    />
                </>
            )}

            {/* Luxury decorations if luxury template */}
            {isDark && (
                <div className="absolute inset-0 pointer-events-none border-[20px] md:border-[40px] border-amber-500/10" />
            )}
        </motion.div>
    );
}
