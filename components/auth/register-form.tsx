"use client"

import * as z from "zod"

import { useForm } from "react-hook-form"
import { useState, useTransition } from "react"
import { zodResolver } from "@hookform/resolvers/zod"

import { RegisterSchema } from "@/schemas"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormLabel, FormField, FormItem, FormMessage } from "@/components/ui/form"

import { CardWrapper } from "./card-wrapper"
import { Button } from "@/components/ui/button"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"

import { register } from "@/actions/register"

export const RegisterForm = () => {
	const [error, setError] = useState<string | undefined>("")
	const [success, setSuccess] = useState<string | undefined>("")
	const [isPending, startTransiton] = useTransition()
	const form = useForm<z.infer<typeof RegisterSchema>>({ resolver: zodResolver(RegisterSchema), defaultValues: { email: "", password: "", name: "" } })

	const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
		startTransiton(() => {
			register(values).then(data => {
				setError(data.error)
				setSuccess(data.success)
			})
		})
	}

	return (
		<CardWrapper headerLabel="Registrier' Dich!" backButtonLabel="zum Login" backButtonHref="/auth/login" showSocial>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<div className="space-y-4">
						<FormField
							control={form.control}
							name="name"
							disabled={isPending}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name:</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Mustermann" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							disabled={isPending}
							render={({ field }) => (
								<FormItem>
									<FormLabel>E-Mail:</FormLabel>
									<FormControl>
										<Input {...field} placeholder="mustermann@beispiel.de" type="email" />
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
									<FormLabel>Password:</FormLabel>
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
						Registrieren
					</Button>
				</form>
			</Form>
		</CardWrapper>
	)
}
