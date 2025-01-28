import express from "express";
import {Gadget} from "../models/Gadget.js"
import { add_new_gadget, delete_gadget, fetch_all_gadgets, update_gadget, self_destruct } from "../controllers.js";
import { isAdmin } from "../middlewares.js";

const router = express.Router();

// GET: Retrieve all gadgets with mission success probability
router.get("/",  fetch_all_gadgets);

router.use(isAdmin);

// POST: Add a new gadget
router.post("/", add_new_gadget);

// PATCH: Update a gadget
router.patch("/:id", update_gadget);

// DELETE: Mark gadget as decommissioned
router.delete("/:id", delete_gadget);

router.post('/:id/self-destruct', self_destruct);

export default router;
