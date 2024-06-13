"use client"

import { createContext, useState, ReactNode, Dispatch, SetStateAction, useContext } from "react"
import { useSession } from "next-auth/react"
import { getAppLinksByUser } from "@/actions/link"
interface AppContextProps {
	isToggled: boolean
	setToggle: Dispatch<SetStateAction<boolean>>
}

const AppContext = createContext<AppContextProps | undefined>(undefined)

interface AppProviderProps {
	children: ReactNode
}

const AppProvider = ({ children }: AppProviderProps) => {
	const [isToggled, setToggle] = useState<boolean>(false)
	const links = getAppLinksByUser()
	console.log(links)
	return <AppContext.Provider value={{ isToggled, setToggle }}>{children}</AppContext.Provider>
}

const useAppContext = () => {
	const context = useContext(AppContext)
	if (context === undefined) {
		throw new Error("useAppContext must be used within an AppProvider")
	}
	return context
}

export { AppProvider, useAppContext }
