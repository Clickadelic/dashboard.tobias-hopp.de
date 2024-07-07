"use client"

import { createContext, useState, ReactNode, Dispatch, SetStateAction, useContext } from "react"
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
