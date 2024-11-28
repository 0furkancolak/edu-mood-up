export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-auto bg-emerald-600 py-24 lg:py-32 px-4 md:px-0">
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-full max-w-[450px] mx-auto h-auto bg-white rounded-xl">
          {children}
        </div>
      </div>
    </div>
  );
}
