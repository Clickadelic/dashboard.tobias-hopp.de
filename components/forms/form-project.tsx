import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { useTransition, useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useSession } from "next-auth/react"

import { Input } from "@/components/ui/input"
import { Form, FormControl, FormLabel, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

import { FiPlus } from "react-icons/fi"

import { ProjectSchema } from "@/schemas"
import { addProject, getProjectsByUserId, getProjectById, deleteProjectById } from "@/actions/project"

interface FormProjectProps {
	project: Project | null
}

import { Project } from "@prisma/client"
export const FormProject = ({ project }: FormProjectProps) => {
	return (
		<div>
			<h1>{project.title}</h1>
			<h2>{project.description}</h2>
			<h3>{project.url}</h3>
		</div>
	)
}
