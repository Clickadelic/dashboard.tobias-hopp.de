interface AuthLayoutProps {
	children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
	return <div className="h-full flex items-center justify-center bg-slate-800">{children}</div>;
};

export default AuthLayout;
