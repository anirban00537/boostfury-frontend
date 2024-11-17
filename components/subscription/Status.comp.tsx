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
  const subscriptionData = subscription.subscription;
  const plan = subscriptionData?.package?.name || "Free Plan";
  const expiresAt = subscriptionData?.endDate;
  const expiryFormatted = moment(expiresAt).format("MMM DD, YYYY");

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
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-blue-500/20">
                  <DiamondSVG className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-800">
                  {plan}
                </span>
                <span className="text-xs text-gray-500 mt-0.5">
                  Valid until {expiryFormatted}
                </span>
              </div>
            </div>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="bg-white p-5 border-0 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.2)] rounded-2xl w-80"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-medium">Current Plan:</span>
              <span>{plan}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Expires:</span>
              <span>{expiryFormatted}</span>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SubscriptionInfo;
