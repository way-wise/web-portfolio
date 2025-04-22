"use client";

import { LottieAnimation } from "./lottie-animation";
import badgeAnimation from "../../public/images/badge.json";

export function BadgeAnimation() {
  return (
    <LottieAnimation
      animationData={badgeAnimation}
      className="w-24 h-24" // Adjust size as needed
    />
  );
} 