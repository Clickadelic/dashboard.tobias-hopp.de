"use client";

import * as z from "zod";

import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { LoginSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormLabel, FormField, FormItem, FormMessage } from "@/components/ui/form";

import { CardWrapper } from "./card-wrapper";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useSearchParams } from "next/navigation";

import { login } from "@/actions/login";

export const LoginForm = () => {
	const searchParams = useSearchParams();
	const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "E-Mail bereits in Verwendung." : "";

	const [showTwoFactor, setShowTwoFactor] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");
	const [isPending, startTransiton] = useTransition();
	const form = useForm<z.infer<typeof LoginSchema>>({ resolver: zodResolver(LoginSchema), defaultValues: { email: "", password: "", code: "" } });

	const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
		setError("");
		setSuccess("");

		startTransiton(() => {
			login(values)
				.then(data => {
					if (data?.error) {
						form.reset();
						setError(data.error);
					}

					if (data?.success) {
						form.reset();
						setSuccess(data.success);
					}

					if (data?.twoFactor) {
						setShowTwoFactor(true);
					}
				})
				.catch(() => setError("Unbekannter Fehler."));
		});
	};

	return (
		<CardWrapper headerLabel="Willkommen zurück!" backButtonLabel="zur Registrierung" backButtonHref="/auth/register" showSocial>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					{showTwoFactor && (
						<FormField
							control={form.control}
							name="code"
							disabled={isPending}
							render={({ field }) => (
								<FormItem>
									<FormLabel>2FA-Code:</FormLabel>
									<FormControl>
										<Input {...field} disabled={isPending} placeholder="123456" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					)}
					{!showTwoFactor && (
						<>
							<div className="space-y-4">
								<FormField
									control={form.control}
									name="email"
									disabled={isPending}
									render={({ field }) => (
										<FormItem>
											<FormLabel>E-Mail:</FormLabel>
											<FormControl>
												<Input {...field} placeholder="z.B. name@anbieter.xy" type="email" />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="password"
									disabled={isPending}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Passwort:</FormLabel>
											<FormControl>
												<Input {...field} placeholder="******" type="password" />
											</FormControl>
											<Button size="sm" variant="link" className="px-0 font-normal">
												<Link href="/auth/reset">Passwort vergessen?</Link>
											</Button>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</>
					)}
					<FormError message={error || urlError} />
					<FormSuccess message={success} />
					<Button type="submit" disabled={isPending} className="w-full">
						{showTwoFactor ? "Bestätigen" : "Login"}
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};
