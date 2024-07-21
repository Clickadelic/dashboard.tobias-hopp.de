// lib/cors-middleware.js
import { NextApiRequest, NextApiResponse } from "next"
import Cors from "cors"

// Initialisieren Sie das cors-Middleware
const cors = Cors({
	methods: ["GET", "HEAD", "POST"], // Passen Sie die Methoden nach Bedarf an
	origin: "*" // Erlaubt alle Ursprünge. Setzen Sie dies auf die spezifische Domain, wenn nötig
})

type MiddlewareFn = (req: NextApiRequest, res: NextApiResponse, next: (err?: any) => void) => void

// Helper Methode zum Promisify der Middleware
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: MiddlewareFn) {
	return new Promise<void>((resolve, reject) => {
		fn(req, res, result => {
			if (result instanceof Error) {
				return reject(result)
			}
			return resolve()
		})
	})
}

export default cors
export { runMiddleware }
