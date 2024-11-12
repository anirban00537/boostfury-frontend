import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import PricingModal from "./Pricing-Modal.comp";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { CreditCard, Diamond } from "lucide-react";
import { DiamondSVG } from "../editor/shared-components/Svg-Icons.comp";

const BillingModal: React.FC = () => {
  const { subscription } = useSelector((state: RootState) => state.user);
  const isActive = subscription.isSubscribed && 
    subscription.subscription?.status === 'active';

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getSubscriptionDetails = () => {
    if (!isActive) {
      return {
        status: "inactive",
        message: "No Active Subscription",
        description: "Subscribe now to access premium features and remove watermarks.",
        className: "bg-yellow-50 text-yellow-700",
      };
    }

    return {
      status: "active",
      message: `Active ${subscription.subscription?.productName} Plan`,
      description: `${subscription.subscription?.variantName} subscription`,
      className: "border-borderColor text-green-700",
    };
  };

  const details = getSubscriptionDetails();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start">
          <CreditCard className="w-4 h-4 mr-2" />
          Billing
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] flex flex-col items-center border text-textColor border-borderColor">
        <DialogHeader className="text-center">
          <div className="mx-auto bg-primary/10 p-3 text-primary rounded-full w-fit">
            <DiamondSVG />
          </div>
          <DialogTitle className="text-2xl font-bold mt-4 text-textColor">
            Billing Information
          </DialogTitle>
        </DialogHeader>
        <div className="mt-6 text-center w-full">
          <div className="space-y-4">
            <div className={`p-4 rounded-lg border ${details.className}`}>
              <p className="font-medium">{details.message}</p>
              {isActive && (
                <p className="text-sm text-gray-600 mt-1">{details.description}</p>
              )}
            </div>

            {isActive ? (
              <>
                <p className="text-textColor">Your subscription is active until:</p>
                <p className="text-2xl font-bold text-primary">
                  {formatDate(subscription.expiresAt || '')}
                </p>
                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <p>Plan Limits:</p>
                  <ul className="space-y-1">
                    <li>AI Words: {subscription.limits.aiWordsPerMonth.toLocaleString()} per month</li>
                    <li>Posts: {subscription.limits.postsPerMonth} per month</li>
                    <li>Workspaces: {subscription.limits.workspaces}</li>
                    <li>LinkedIn Profiles: {subscription.limits.linkedInProfiles}</li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <p className="text-gray-600">{details.description}</p>
                <PricingModal
                  buttonElement={
                    <Button className="mt-4 w-full" size="lg">
                      View Pricing Plans
                    </Button>
                  }
                />
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BillingModal;
