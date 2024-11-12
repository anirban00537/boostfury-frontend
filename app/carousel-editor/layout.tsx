import AuthCheckLayout from "@/components/layout/Auth-Check.layout.comp";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthCheckLayout>{children}</AuthCheckLayout>;
}
