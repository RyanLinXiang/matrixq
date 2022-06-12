import express from "express"
import { router as apiRouter } from "./api/router.js"
import { createRequire } from "module"
const require = createRequire(import.meta.url)

const { NODE_ENV: environment } = process.env

const { routes, server: { port } } = require(`./config/${environment || "development"}.json`)

const app = express()

app.use(routes.api, apiRouter)

app.listen(port, () => console.log(`Server has startet and is listening on port ${port}`))
