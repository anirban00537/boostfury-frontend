import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <div className="min-h-screen w-full flex">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-white">
        <div className="w-full max-w-[440px]">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold mb-2 flex items-center gap-2">
              Login{" "}
              <span role="img" aria-label="wave" className="text-2xl">
                ✌️
              </span>
            </h1>
            <p className="text-gray-500 text-sm">
              How do I get started lorem ipsum dolor sit?
            </p>
          </div>

          <div className="space-y-4">
            {/* Social Login Buttons */}
            <button className="w-full flex items-center justify-center gap-2 h-11 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12c6.627 0 12-5.373 12-12S18.627 0 12 0zm.14 19.018c-3.868 0-7-3.14-7-7.018c0-3.878 3.132-7.018 7-7.018c1.89 0 3.47.697 4.682 1.829l-1.974 1.978v-.004c-.735-.702-1.667-1.062-2.708-1.062c-2.31 0-4.187 1.956-4.187 4.273c0 2.315 1.877 4.277 4.187 4.277c2.096 0 3.522-1.202 3.816-2.852H12.14v-2.737h6.585c.088.47.135.96.135 1.474c0 4.01-2.677 6.86-6.72 6.86z"
                />
              </svg>
              <span className="text-sm font-medium">Sign in with Google</span>
            </button>

            <button className="w-full flex items-center justify-center gap-2 h-11 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669c1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                />
              </svg>
              <span className="text-sm font-medium">Sign in with Facebook</span>
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">
                  Or sign in with email
                </span>
              </div>
            </div>

            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <Input
                  name="email"
                  placeholder="betuka312@"
                  required
                  className="h-11 px-4 border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <Link
                    className="text-xs text-blue-600 hover:text-blue-700"
                    href="/forgot-password"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter your Password"
                  required
                  className="h-11 px-4 border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <SubmitButton
                pendingText="Signing in..."
                formAction={signInAction}
                className="w-full h-11 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-200"
              >
                Login
              </SubmitButton>

              <FormMessage message={searchParams} />
            </form>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden lg:block w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 relative overflow-hidden">
        {/* Animated background patterns */}
        <div className="absolute inset-0 bg-[url('/images/wave-pattern.svg')] opacity-10 animate-slow-spin" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent" />

        {/* Floating circles */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-sky-400/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-r from-sky-400/20 to-blue-400/20 rounded-full blur-3xl animate-blob animation-delay-2000" />

        <div className="relative h-full flex flex-col items-center justify-center p-16 text-white">
          <div className="max-w-md text-center space-y-12">
            {/* Main Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-6xl font-bold leading-tight bg-gradient-to-r from-white via-blue-100 to-sky-200 bg-clip-text text-transparent">
                  Automate Your LinkedIn
                </h2>
                <div className="text-4xl font-bold text-white">
                  Reach 10x More Prospects
                  <span className="ml-2 animate-bounce inline-block">🚀</span>
                </div>
              </div>

              <p className="text-xl text-blue-100 leading-relaxed">
                Smart scheduling that helps you connect with the right people at
                the right time
              </p>
            </div>

            {/* Viral LinkedIn Stats */}
            <div className="relative mt-12">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-sky-500/20 rounded-2xl blur-xl" />
              <div className="relative space-y-6 bg-white/10 rounded-2xl p-8 backdrop-blur-md border border-white/20">
                <div className="grid grid-cols-3 gap-8">
                  <div className="text-center space-y-1">
                    <div className="text-4xl font-bold bg-gradient-to-r from-white to-sky-200 bg-clip-text text-transparent">
                      500+
                    </div>
                    <div className="text-sm text-blue-100">
                      Connections/Week
                    </div>
                  </div>
                  <div className="text-center space-y-1">
                    <div className="text-4xl font-bold bg-gradient-to-r from-white to-sky-200 bg-clip-text text-transparent">
                      24/7
                    </div>
                    <div className="text-sm text-blue-100">Active Growth</div>
                  </div>
                  <div className="text-center space-y-1">
                    <div className="text-4xl font-bold bg-gradient-to-r from-white to-sky-200 bg-clip-text text-transparent">
                      85%
                    </div>
                    <div className="text-sm text-blue-100">Response Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Proof Badge */}
          <div className="absolute top-8 right-8">
            <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <span className="text-sm font-medium">
                Trusted by LinkedIn Influencers 🌟
              </span>
            </div>
          </div>

          {/* Floating Action Badge */}
          <div className="absolute bottom-8 left-8 animate-pulse">
            <div className="bg-gradient-to-br from-white/90 to-white/70 rounded-full w-14 h-14 flex items-center justify-center shadow-lg">
              <span className="text-2xl">⚡</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
