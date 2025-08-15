const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-zinc-400 min-h-screen flex flex-col items-center">
      {children}
    </div>
  );
};

export default AuthLayout;
