"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SettingsSchema } from "@/schemas";

import { useTransition, useState } from "react";
import { useSession } from "next-auth/react";

import { Form, FormField, FormControl, FormItem, FormLabel, FormDescription, FormMessage } from "@/components/ui/form";

import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { settings } from "@/actions/settings";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

const SettingsPage = () => {
	const user = useCurrentUser();
	const { update } = useSession();

	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");

	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof SettingsSchema>>({
		resolver: zodResolver(SettingsSchema),
		defaultValues: {
			name: user?.name || undefined,
			email: user?.email || undefined,
			password: undefined,
			newPassword: undefined,
			isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined
		}
	});
	/**
	 * Handles the form submission for updating user settings.
	 *
	 * @param {z.infer<typeof SettingsSchema>} values - The form values to be submitted.
	 * @return {void} This function does not return anything.
	 */
	const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
		startTransition(() => {
			settings(values)
				.then(data => {
					if (data.error) {
						setError(data.error);
					}
					if (data.success) {
						update();
						setSuccess(data.success);
					}
				})
				.catch(() => {
					setError("Irgendwas ging serverseitig schief.");
				});
		});
	};
	return (
		<div className="page-wrapper">
			<h2 className="text-md font-bold text-slate-700 mb-5">Profil</h2>
			<div className="bg-white rounded shadow-sm border p-3">
				<CardContent>
					<Form {...form}>
						<form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
							<div className="space-y-4">
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Name</FormLabel>
											<FormControl>
												<Input {...field} placeholder="Mustermann" disabled={isPending} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								{user?.isOAuth === false && (
									<>
										<FormField
											control={form.control}
											name="email"
											render={({ field }) => (
												<FormItem>
													<FormLabel>E-Mail</FormLabel>
													<FormControl>
														<Input {...field} placeholder="name@anbieter.xy" disabled={isPending} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										{/* //BUG: Prevents correct form submission name="password" */}
										{/* fake fields are a workaround for chrome autofill getting the wrong fields */}
										<input className="hidden" type="text" name="fakeusernameremembered" />
										<input className="hidden" type="password" name="fakepasswordremembered" />
										<FormField
											control={form.control}
											name="password"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Passwort</FormLabel>
													<FormControl>
														<Input {...field} type="password" placeholder="******" disabled={isPending} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="newPassword"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Neues Passwort</FormLabel>
													<FormControl>
														<Input {...field} type="password" placeholder="******" disabled={isPending} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</>
								)}

								{user?.isOAuth === false && (
									<FormField
										control={form.control}
										name="isTwoFactorEnabled"
										render={({ field }) => (
											<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
												<div className="space-y-.5">
													<FormLabel>Zwei-Faktor Authentifizierung</FormLabel>
													<FormDescription>Aktiviere Zwei-Faktor Authentifzierung für Deinen Account.</FormDescription>
												</div>
												<FormControl>
													<Switch disabled={isPending} checked={field.value} onCheckedChange={field.onChange} />
												</FormControl>
											</FormItem>
										)}
									/>
								)}
							</div>
							<FormError message={error} />
							<FormSuccess message={success} />
							<Button type="submit">Speichern</Button>
						</form>
					</Form>
				</CardContent>
			</div>
		</div>
	);
};

export default SettingsPage;
