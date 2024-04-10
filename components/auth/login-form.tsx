"use client"

import * as z from "zod"

import { useForm } from "react-hook-form"
import { useState, useTransition } from "react"
import { zodResolver } from "@hookform/resolvers/zod"

import { LoginSchema } from "@/schemas"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormLabel, FormField, FormItem, FormMessage } from "@/components/ui/form"

import { CardWrapper } from "./card-wrapper"
import { Button } from "@/components/ui/button"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"

import { login } from "@/actions/login"

export const LoginForm = () => {
	const [error, setError] = useState<string | undefined>("")
	const [success, setSuccess] = useState<string | undefined>("")
	const [isPending, startTransiton] = useTransition()
	const form = useForm<z.infer<typeof LoginSchema>>({ resolver: zodResolver(LoginSchema), defaultValues: { email: "", password: "" } })
	const onSubmit = (values: z.infer<typeof LoginSchema>) => {
		startTransiton(() => {
			login(values).then(data => {
				setError(data.error)
				setSuccess(data.success)
			})
		})
	}

	return (
		<CardWrapper headerLabel="Willkommen zurück!" backButtonLabel="Noch keinen Account?" backButtonHref="/auth/register" showSocial>
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
										<Input {...field} placeholder="Mads Mustermann" type="email" />
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
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormError message={error} />
					<FormSuccess message={success} />
					<Button type="submit" disabled={isPending} className="w-full">
						Login
					</Button>
				</form>
			</Form>
		</CardWrapper>
	)
}
