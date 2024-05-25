"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SettingsSchema } from "@/schemas";

import { useTransition, useState } from "react";
import { useSession } from "next-auth/react";

import { Form, FormField, FormControl, FormItem, FormLabel, FormDescription, FormMessage } from "@/components/ui/form";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { settings } from "@/actions/settings";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { UserRole } from "@prisma/client";

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
			role: user?.role || undefined,
			isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined
		}
	});
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
		<Card className="w-[600px] m-auto">
			<CardHeader>
				<p className="text-2xl font-semibold text-center">Settings</p>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form className="space-y-6" autoComplete="off" onSubmit={form.handleSubmit(onSubmit)}>
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
							<FormField
								control={form.control}
								name="role"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Role:</FormLabel>
										<Select disabled={isPending} onValueChange={field.onChange} defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Rolle auswählen" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value={UserRole.USER}>User</SelectItem>
												<SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
											</SelectContent>
										</Select>
									</FormItem>
								)}
							/>
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
						<Button type="submit">Save</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};

export default SettingsPage;
