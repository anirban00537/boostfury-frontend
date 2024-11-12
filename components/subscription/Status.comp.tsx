import React from "react";
import PricingModal from "./Pricing-Modal.comp";
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

const SubscriptionInfo = () => {
  const { subscription }: any = useSelector((state: RootState) => state.user);
  const isActive = subscription.isSubscribed;
  const plan = subscription.plan || "Free Plan";
  const expiresAt = subscription.expiresAt;
  const isTrial = subscription.subscription?.isTrial;

  if (!isActive) {
    return (
      <PricingModal
        buttonElement={
          <Button
            variant="ghost"
            size="sm"
            className="w-full h-8 flex items-center justify-center gap-2 text-primary hover:text-primary bg-primary/10 hover:bg-blue-100 rounded-lg transition-colors border border-blue-100"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Upgrade to Pro</span>
            </div>
          </Button>
        }
      />
    );
  }

  const expiryMoment = moment(expiresAt);
  const daysRemaining = expiryMoment.diff(moment(), "days");
  const expiryFormatted = expiryMoment.format("MMM DD, YYYY");

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-blue-500/10 hover:from-blue-500/15 hover:via-indigo-500/15 hover:to-blue-500/15 text-blue-700 rounded-lg transition-all cursor-pointer border border-blue-200/50 shadow-sm"
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 3,
              ease: "easeInOut",
              times: [0, 0.5, 1],
              repeat: Infinity,
            }}
          >
            <div className="relative">
              <DiamondSVG />
              <motion.div
                className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"
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
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-blue-800">
                  {plan} Plan
                </span>
                {isTrial && (
                  <span className="text-xs px-1.5 py-0.5 bg-orange-100 text-orange-700 rounded-full">
                    Trial
                  </span>
                )}
              </div>
              <span className="text-xs text-blue-600/80">
                Valid until {expiryFormatted}
              </span>
            </div>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="bg-white p-4 border border-gray-100 shadow-xl rounded-xl w-72"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-gray-900">
                  {plan} Plan Benefits
                </span>
              </div>
              {isTrial && (
                <span className="text-xs font-medium px-2 py-1 bg-orange-100 text-orange-700 rounded-full">
                  Trial Period
                </span>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-4 bg-blue-50/50 p-2 rounded-lg">
                <span className="text-sm text-gray-600">Status</span>
                <span className="text-sm font-medium text-green-600 flex items-center gap-1.5 bg-green-50 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  Active {isTrial ? '(Trial)' : ''}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 p-2">
                <span className="text-sm text-gray-600">Expiration Date</span>
                <span className="text-sm font-medium text-gray-900">
                  {expiryFormatted}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 p-2">
                <span className="text-sm text-gray-600">Time Remaining</span>
                <span
                  className={`text-sm font-medium px-2 py-0.5 rounded-full ${
                    daysRemaining <= 7
                      ? "text-orange-700 bg-orange-50"
                      : "text-blue-700 bg-blue-50"
                  }`}
                >
                  {daysRemaining > 0
                    ? `${daysRemaining} ${daysRemaining === 1 ? "day" : "days"}`
                    : "Expired"}
                </span>
              </div>
            </div>
            {daysRemaining <= 7 && daysRemaining > 0 && (
              <div className="flex items-center gap-2 text-xs text-orange-700 bg-orange-50 p-2.5 rounded-lg mt-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>
                  Your subscription will expire soon. Please renew to maintain
                  access.
                </span>
              </div>
            )}
            {daysRemaining <= 0 && (
              <div className="flex items-center gap-2 text-xs text-red-700 bg-red-50 p-2.5 rounded-lg mt-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>
                  Your subscription has expired. Please renew to restore access.
                </span>
              </div>
            )}
            {isTrial && (
              <div className="flex items-center gap-2 text-xs text-blue-700 bg-blue-50 p-2.5 rounded-lg">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>
                  You are currently in your trial period. Upgrade to continue accessing premium features after trial ends.
                </span>
              </div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SubscriptionInfo;
