"use client";

import * as z from "zod";

import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewPasswordSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormLabel, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useSearchParams } from "next/navigation";
import { CardWrapper } from "./card-wrapper";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

import { newPassword } from "@/actions/new-password";

export const NewPasswordForm = () => {
	const searchParams = useSearchParams();
	const token = searchParams.get("token");
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");
	const [isPending, startTransiton] = useTransition();

	const form = useForm<z.infer<typeof NewPasswordSchema>>({ resolver: zodResolver(NewPasswordSchema), defaultValues: { password: "" } });

	const onSubmit = async (values: z.infer<typeof NewPasswordSchema>) => {
		setError("");
		setSuccess("");

		startTransiton(() => {
			newPassword(values, token).then(data => {
				setError(data?.error);
				setSuccess(data?.success);
			});
		});
	};

	return (
		<CardWrapper headerLabel="Neues Passwort eingeben" backButtonLabel="zurück zum Login" backButtonHref="/auth/login">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<div className="space-y-4">
						<FormField
							control={form.control}
							name="password"
							disabled={isPending}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password:</FormLabel>
									<FormControl>
										<Input {...field} placeholder="******" autoComplete="false" type="password" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormError message={error} />
					<FormSuccess message={success} />
					<Button type="submit" disabled={isPending} className="w-full">
						Passwort zurücksetzten
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};
