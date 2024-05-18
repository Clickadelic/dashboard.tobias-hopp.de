"use client"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { useEffect, useCallback, useState } from "react"
import { CardWrapper } from "./card-wrapper"
import { FiLoader } from "react-icons/fi"
import { newVerification } from "@/actions/new-verification"
// TODO Import Pfad anpassen
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"

const NewVerificationForm = () => {
	const [error, setError] = useState<string | undefined>()
	const [success, setSuccess] = useState<string | undefined>()
	const searchParams = useSearchParams()

	const token = searchParams.get("token")

	const onSubmit = useCallback(() => {
		if (success || error) return

		if (!token) {
			setError("Aktivierungs-Token fehlt.")
			return
		}

		newVerification(token)
			.then(data => {
				setSuccess(data?.success)
				setError(data?.error)
			})
			.catch(() => {
				setError("Unbekannter Fehler.")
			})

		newVerification(token)
	}, [token, success, error])

	useEffect(() => {
		onSubmit()
	}, [onSubmit])

	return (
		<CardWrapper headerLabel="E-Mail bestätigen" backButtonLabel="zurück zum Login" backButtonHref="/auth/login">
			<div className="flex items-center w-full justify-center">
				{!success && !error && <FiLoader />}
				<FormSuccess message={success} />
				{!success && <FormError message={error} />}
			</div>
		</CardWrapper>
	)
}

export default NewVerificationForm
