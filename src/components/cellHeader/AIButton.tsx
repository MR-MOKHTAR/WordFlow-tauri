import { memo, useCallback } from "react";
import { MdAutoAwesome } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import Tooltip from "../ui/Tooltip";
import clsx from "clsx";

type AIButtonProps = {
  isActive: boolean;
  onToggle: () => void;
};

function AIButton({ isActive, onToggle }: AIButtonProps) {
  const handleClick = useCallback(() => onToggle(), [onToggle]);

  return (
    <Tooltip content="AI Assistant" position="bottom" delay={500}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        className={clsx(
          "relative flex items-center justify-center cursor-pointer overflow-hidden",
          "size-[26px] rounded-[6px] transition-all duration-300",
          isActive
            ? "bg-linear-to-br from-violet-600 via-purple-500 to-indigo-600 text-white shadow-lg ai-btn-glow"
            : "bg-linear-to-br from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/20 text-violet-600 dark:text-violet-400 border border-violet-200/50 dark:border-violet-700/30 hover:border-violet-400",
        )}
      >
        {/* Shimmer Effect for Active State */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "linear",
              }}
              className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent pointer-events-none"
            />
          )}
        </AnimatePresence>

        {/* Pulse effect for Inactive state to draw attention */}
        {!isActive && (
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 rounded-[6px] bg-violet-400 dark:bg-violet-600"
          />
        )}

        <MdAutoAwesome
          size={19}
          className={clsx("relative z-10", isActive && "animate-pulse")}
        />
      </motion.button>
    </Tooltip>
  );
}

export default memo(AIButton);
