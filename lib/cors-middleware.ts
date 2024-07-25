import { NextApiRequest, NextApiResponse } from "next"
import Cors from "cors"

// Definiere die Signatur der Middleware-Funktion
type MiddlewareFn = (req: NextApiRequest, res: NextApiResponse, next: (err?: any) => void) => void

export function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: MiddlewareFn) {
	return new Promise<void>((resolve, reject) => {
		fn(req, res, result => {
			if (result instanceof Error) {
				return reject(result)
			}
			return resolve()
		})
	})
}

// Initialisiere die cors-Middleware
export const cors = Cors({
	methods: ["GET", "HEAD", "POST"], // Passen Sie die Methoden nach Bedarf an
	origin: "https://dasboard.tobias-hopp.de" // Ersetzen Sie dies durch die spezifische Domain
})
