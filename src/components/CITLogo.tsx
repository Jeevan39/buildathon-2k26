import React from "react";

interface CITLogoProps {
  className?: string;
  variant?: "light" | "dark";
  compact?: boolean;
  logoUrl?: string;
}

export const CITLogo: React.FC<CITLogoProps> = ({
  className = "",
  variant = "light",
  compact = false,
  logoUrl = "/cit_logo.jpg",
}) => {
  const isDark = variant === "dark";

  return (
    <div className={`flex items-center gap-2 sm:gap-3 min-w-0 ${className}`}>
      {/* Official CIT Logo Image */}
      <div className="relative flex-shrink-0 flex items-center">
        <img
          src={logoUrl || "/cit_logo.jpg"}
          alt="Channabasaveshwara Institute of Technology Logo"
          className="h-9 sm:h-10 md:h-11 lg:h-12 w-auto object-contain rounded-none flex-shrink-0"
        />
      </div>

      {/* College Typography */}
      <div className="flex flex-col justify-center min-w-0">
        <span
          className={`font-heading font-black tracking-tight text-xs sm:text-[13px] md:text-sm lg:text-[14px] leading-tight ${
            isDark ? "text-white" : "text-[#0b1d3a]"
          }`}
        >
          <span className="block whitespace-nowrap">Channabasaveshwara</span>
          <span className="block whitespace-nowrap">
            Institute of Technology
          </span>
        </span>
      </div>
    </div>
  );
};
