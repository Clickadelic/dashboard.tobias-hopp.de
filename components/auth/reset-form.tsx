"use client";

import * as z from "zod";

import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormLabel, FormField, FormItem, FormMessage } from "@/components/ui/form";

import { CardWrapper } from "./card-wrapper";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

import { reset } from "@/actions/reset";

export const ResetForm = () => {
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");
	const [isPending, startTransiton] = useTransition();
	const form = useForm<z.infer<typeof ResetSchema>>({ resolver: zodResolver(ResetSchema), defaultValues: { email: "" } });

	const onSubmit = async (values: z.infer<typeof ResetSchema>) => {
		setError("");
		setSuccess("");

		startTransiton(() => {
			reset(values).then(data => {
				setError(data?.error);
				setSuccess(data?.success);
			});
		});
	};

	return (
		<CardWrapper headerLabel="Passwort vergessen?" backButtonLabel="zurück zum Login" backButtonHref="/auth/login">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
					</div>
					<FormError message={error} />
					<FormSuccess message={success} />
					<Button type="submit" disabled={isPending} className="w-full">
						Passwort neu erstellen
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};
