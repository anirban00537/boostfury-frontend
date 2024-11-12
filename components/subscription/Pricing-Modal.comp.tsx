import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import Pricing from "./Pricing.comp";

export default function PricingModal({
  buttonElement,
}: {
  buttonElement: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{buttonElement}</DialogTrigger>
      <DialogContent className="border border-borderColor text-textColor p-0 overflow-hidden max-w-[800px] w-[90vw] max-h-[95vh]">
        <div className="overflow-y-auto">
          <Pricing />
        </div>
      </DialogContent>
    </Dialog>
  );
}
