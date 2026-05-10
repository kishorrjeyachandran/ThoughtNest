function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen bg-[#191919] flex items-center justify-center px-6">

      <div className="w-full max-w-md">

        <div className="mb-10">

          <h1 className="text-4xl font-bold tracking-tight">
            {title}
          </h1>

          <p className="text-[#9B9B9B] mt-3 leading-7">
            {subtitle}
          </p>

        </div>

        {children}

      </div>

    </div>
  );
}

export default AuthLayout;