import React from "react";
import { Button } from "../ui/button";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { DiamondSVG } from "../editor/shared-components/Svg-Icons.comp";
import { Sparkles, Crown, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import moment from "moment";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const SubscriptionInfo = () => {
  const { subscription } = useSelector((state: RootState) => state.user);
  const isActive = subscription.isActive;
  const subscriptionData = subscription.subscription;
  const isTrial = subscriptionData?.isTrial;
  const plan = subscriptionData?.package?.name || "Free Plan";
  const expiresAt = subscriptionData?.endDate;

  const expiryMoment = moment(expiresAt);
  const daysRemaining = expiryMoment.diff(moment(), "days");
  const expiryFormatted = expiryMoment.format("MMM DD, YYYY");

  const router = useRouter();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            className="flex items-center gap-3 px-4 py-3 
                     bg-gradient-to-r from-gray-50 via-white to-gray-50
                     hover:from-blue-50/50 hover:via-white hover:to-blue-50/50 
                     rounded-xl transition-all duration-300 cursor-pointer 
                     border border-gray-200/60
                     shadow-[0_2px_10px_-2px_rgba(0,0,0,0.05)]
                     hover:shadow-[0_4px_16px_-4px_rgba(59,130,246,0.15)]"
          >
            {/* Left Section */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center shadow-lg",
                  daysRemaining <= 0
                    ? "bg-gradient-to-br from-red-500 to-red-600 shadow-red-500/20"
                    : daysRemaining <= 7
                    ? "bg-gradient-to-br from-orange-500 to-orange-600 shadow-orange-500/20"
                    : "bg-gradient-to-br from-blue-500 to-indigo-600 shadow-blue-500/20"
                )}>
                  <DiamondSVG className="w-5 h-5 text-white" />
                  <motion.div
                    className={cn(
                      "absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full ring-2 ring-white",
                      daysRemaining <= 0
                        ? "bg-red-500"
                        : daysRemaining <= 7
                        ? "bg-orange-500"
                        : "bg-green-500"
                    )}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.7, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-800">
                    {plan}
                  </span>
                  {isTrial && (
                    <span className="text-[10px] px-1.5 py-0.5 bg-gradient-to-r from-amber-500 to-orange-500 
                                  text-white rounded-full font-medium tracking-wide shadow-sm">
                      TRIAL
                    </span>
                  )}
                  {daysRemaining <= 0 && (
                    <span className="text-[10px] px-1.5 py-0.5 bg-gradient-to-r from-red-500 to-red-600 
                                  text-white rounded-full font-medium tracking-wide shadow-sm">
                      EXPIRED
                    </span>
                  )}
                  {!isTrial && daysRemaining <= 7 && daysRemaining > 0 && (
                    <span className="text-[10px] px-1.5 py-0.5 bg-gradient-to-r from-orange-500 to-orange-600 
                                  text-white rounded-full font-medium tracking-wide shadow-sm">
                      EXPIRING SOON
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                  <span>{daysRemaining > 0 
                    ? `Valid until ${expiryFormatted}` 
                    : "Subscription expired"}</span>
                  {daysRemaining > 0 && (
                    <span className="px-1.5 py-0.5 bg-gray-100 rounded-full text-[10px]">
                      {daysRemaining} {daysRemaining === 1 ? "day" : "days"} left
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="bg-white p-5 border-0 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.2)] rounded-2xl w-80"
        >
          <div className="space-y-4">
            {/* Header Section */}
            <div className="flex items-start justify-between pb-3 border-b border-gray-100">
              {/* ... Header content ... */}
            </div>

            {/* Status Details */}
            <div className="space-y-3">
              {/* ... Status items ... */}
            </div>

            {/* Status Messages */}
            {daysRemaining <= 7 && daysRemaining > 0 && (
              <div className="flex items-start gap-2.5 p-3 bg-gradient-to-r from-orange-50 to-orange-100/50 rounded-xl">
                {/* ... Expiring soon message ... */}
              </div>
            )}
            {daysRemaining <= 0 && (
              <div className="flex items-start gap-2.5 p-3 bg-gradient-to-r from-red-50 to-red-100/50 rounded-xl">
                {/* ... Expired message ... */}
              </div>
            )}
            {isTrial && (
              <div className="flex items-start gap-2.5 p-3 bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-xl">
                {/* ... Trial message ... */}
              </div>
            )}

            {/* Action Button - New section */}
            {(daysRemaining <= 7 || isTrial || daysRemaining <= 0) && (
              <div className="pt-2">
                <Button
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white 
                           shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30
                           transition-all duration-200 h-10"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    router.push('/pricing');
                  }}
                >
                  <span className="flex items-center justify-center gap-2">
                    {daysRemaining <= 0 ? (
                      <>
                        <AlertTriangle className="w-4 h-4" />
                        <span>Renew Subscription</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Upgrade Plan</span>
                      </>
                    )}
                    <motion.span
                      animate={{
                        x: [0, 3, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                      }}
                    >
                      →
                    </motion.span>
                  </span>
                </Button>
              </div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SubscriptionInfo;
