export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full flex items-center justify-center h-dvh bg-emerald-600 py-24 lg:py-32 px-4 md:px-0">
      <div className="w-full max-w-[450px] mx-auto bg-white rounded-xl">
        {children}
      </div>
    </div>
  );
}
