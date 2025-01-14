import { resetPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function ResetPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-[440px] p-8 bg-white rounded-2xl shadow-sm">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-2xl font-semibold">Reset Password</h1>
            <span role="img" aria-label="lock" className="text-2xl">
              🔐
            </span>
          </div>
          <p className="text-gray-500 text-sm">
            Please enter your new password below to secure your account.
          </p>
        </div>

        <form className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                New Password
              </Label>
              <Input
                type="password"
                name="password"
                placeholder="Enter new password"
                required
                className="h-11 px-4 border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password
              </Label>
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                required
                className="h-11 px-4 border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Password Tips */}
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
            <h3 className="font-medium text-sm text-blue-800 mb-2">
              Password Requirements
            </h3>
            <ul className="space-y-1.5">
              {[
                "Use at least 8 characters",
                "Include uppercase & lowercase letters",
                "Add numbers and special characters",
                "Avoid common phrases or personal info",
              ].map((tip, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-sm text-blue-600"
                >
                  <span className="text-blue-500">✓</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <SubmitButton
              formAction={resetPasswordAction}
              className="w-full h-11 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-200"
            >
              Reset Password
            </SubmitButton>
            <FormMessage message={searchParams} />
          </div>
        </form>
      </div>
    </div>
  );
}
