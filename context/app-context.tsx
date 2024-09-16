"use client";

import { createContext, useState, ReactNode, Dispatch, SetStateAction, useContext } from "react";

interface AppContextProps {
	isAppDialogOpen: boolean;
	setAppDialogOpen: Dispatch<SetStateAction<boolean>>;
	isLinkDialogOpen: boolean;
	setLinkDialogOpen: Dispatch<SetStateAction<boolean>>;
	isProjectDialogOpen: boolean;
	setProjectDialogOpen: Dispatch<SetStateAction<boolean>>;
	isNoticeDialogOpen: boolean;
	setNoticeDialogOpen: Dispatch<SetStateAction<boolean>>;
	isTodoDialogOpen: boolean;
	setTodoDialogOpen: Dispatch<SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
	children: ReactNode;
}

const AppProvider = ({ children }: AppProviderProps) => {
	const [isToggled, setToggle] = useState<boolean>(false);
	const [isAppDialogOpen, setAppDialogOpen] = useState<boolean>(false);
	const [isLinkDialogOpen, setLinkDialogOpen] = useState<boolean>(false);
	const [isProjectDialogOpen, setProjectDialogOpen] = useState<boolean>(false);
	const [isNoticeDialogOpen, setNoticeDialogOpen] = useState<boolean>(false);
	const [isTodoDialogOpen, setTodoDialogOpen] = useState<boolean>(false);
	return (
		<AppContext.Provider
			value={{
				isAppDialogOpen,
				setAppDialogOpen,
				isLinkDialogOpen,
				setLinkDialogOpen,
				isProjectDialogOpen,
				setProjectDialogOpen,
				isNoticeDialogOpen,
				setNoticeDialogOpen,
				isTodoDialogOpen,
				setTodoDialogOpen
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

const useAppContext = () => {
	const context = useContext(AppContext);
	if (context === undefined) {
		throw new Error("useAppContext must be used within an AppProvider");
	}
	return context;
};

export { AppProvider, useAppContext };
