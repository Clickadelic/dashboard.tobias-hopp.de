"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { useState, useTransition } from "react"
import { useSession } from "next-auth/react"
import { useCurrentUser } from "@/hooks/use-current-user"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Form, FormField, FormControl, FormItem, FormLabel, FormDescription, FormMessage } from "@/components/ui/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { FormError } from "@/components/forms/form-error"
import { FormSuccess } from "@/components/forms/form-success"

import { toast } from "sonner"

import { settings } from "@/actions/user-settings"
import { UserSchema } from "@/schemas"
import { FaUser } from "react-icons/fa"
import { Textarea } from "../ui/textarea"

interface UserProfileCardProps {
	classNames?: string
}

export const UserProfileCard = ({ classNames }: UserProfileCardProps) => {
	const user = useCurrentUser()
	const { update } = useSession()

	const [error, setError] = useState<string | undefined>()
	const [success, setSuccess] = useState<string | undefined>()
	const [isPending, startTransition] = useTransition()

	const form = useForm<z.infer<typeof UserSchema>>({
		resolver: zodResolver(UserSchema),
		defaultValues: {
			name: user?.name || undefined,
			email: user?.email || undefined,
			bio: user?.bio || undefined,
			profileImage: user?.profileImage || undefined,
			backgroundImage: user?.backgroundImage || undefined,
			isTwoFactorEnabled: user?.isTwoFactorEnabled || false,
			role: user?.role || undefined,
			password: undefined,
			newPassword: undefined
		}
	})

	const userFormSubmit = (values: z.infer<typeof UserSchema>) => {
		startTransition(() => {
			const result = settings(values)
				.then(data => {
					update({ name: values.name, email: values.email })
					if (data.error) {
						setError(data.error)
					}

					if (data.success) {
						setSuccess(data.success)
					}
				})
				.catch(error => {
					setError("Irgendwas ging schief - Ursache unbekannt")
				})
		})
	}

	return (
		<div className={classNames}>
			<div className="bg-white rounded-lg pb-12">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(userFormSubmit)}>
						<div className="rounded-tl rounded-tr bg-slate-200 h-36">{/* Ghost Div */}</div>
						<div className="bg-white rounded-full border border-slate-200 size-28 mx-auto -translate-y-1/2">
							<Avatar>
								<AvatarImage src={user?.profileImage || ""} className="size-24" />
								<AvatarFallback>
									<FaUser />
								</AvatarFallback>
							</Avatar>
						</div>

						<h1 className="text-2xl font-medium text-center">{user?.name}</h1>
						<h2 className="text-xl font-light text-center">{user?.email}</h2>
						<div className="w-96 mx-auto">
							<div className="my-5 h-[44px]">
								<FormError message={error} />
								<FormSuccess message={success} />
							</div>
							<Tabs defaultValue="profile">
								<TabsList className="w-full flex justify-around">
									<TabsTrigger value="profile" className="w-full block">
										Profil
									</TabsTrigger>
									<TabsTrigger value="credentials" className="w-full block">
										Credentials
									</TabsTrigger>
								</TabsList>
								<TabsContent value="profile" className="py-4 min-h-[375px] space-y-3">
									<FormField
										control={form.control}
										name="name"
										disabled={isPending}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Benutzername</FormLabel>
												<FormControl>
													<Input {...field} placeholder="Benutzername" />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="bio"
										disabled={isPending}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Bio (optional)</FormLabel>
												<FormControl>
													<Textarea rows={4} {...field} placeholder="Über Dich..." />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</TabsContent>
								<TabsContent value="credentials" className="py-4 min-h-[375px] space-y-3">
									<FormField
										control={form.control}
										name="email"
										disabled={isPending}
										render={({ field }) => (
											<FormItem>
												<FormLabel>E-Mail</FormLabel>
												<FormControl>
													<Input {...field} placeholder="E-Mail" />
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
												<FormLabel>Aktuelles Passwort</FormLabel>
												<FormControl>
													<Input {...field} type="password" autoFocus={false} required={false} autoComplete="off" placeholder="Passwort" />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="newPassword"
										disabled={isPending}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Neues Passwort</FormLabel>
												<FormControl>
													<Input {...field} type="password" placeholder="Neues Passwort" />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="isTwoFactorEnabled"
										disabled={isPending}
										render={({ field }) => (
											<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
												<div className="space-y-0.5">
													<FormLabel>Zwei-Faktor-Authentifizierung</FormLabel>
													<FormDescription>Sicheren Login aktivieren</FormDescription>
												</div>

												<FormControl>
													<Switch disabled={isPending} checked={field.value} onCheckedChange={field.onChange} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</TabsContent>
							</Tabs>
							<Button disabled={isPending} variant="default" type="submit" className="w-full">
								Speichern
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</div>
	)
}
