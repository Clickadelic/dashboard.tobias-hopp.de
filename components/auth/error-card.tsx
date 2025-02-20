import { Header } from "@/components/auth/header";
import { BackButton } from "@/components/auth/back-button";
import { CardHeader, Card, CardFooter } from "@/components/ui/card";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
export const ErrorCard = () => {
	return (
		<CardWrapper headerLabel="Oops, irgendwas ging schief!" backButtonHref="/" backButtonLabel="Zum Login">
			<div className="w-full flex justify-center items-center">
				<ExclamationTriangleIcon className="text-destructive" />
			</div>
		</CardWrapper>
	);
};
