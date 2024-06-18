import express from "express"
import { getAllUsers, getUserById } from "../controllers/userController.js"

const router = express.Router()

export default router