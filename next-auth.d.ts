import NextAuth, { type DefaultSession } from "next-auth";
import { UserRole } from "@prisma/client";
// TODO: User Session anpassen mit erweiterten Feldern
export type ExtendedUser = DefaultSession["user"] & {
	backgroundImageUrl: string | null;
	role: UserRole;
	isTwoFactorEnabled: boolean;
	isOAuth: boolean;
};

declare module "next-auth" {
	interface Session {
		user: ExtendedUser;
	}
}
