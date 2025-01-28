import jwt from "jsonwebtoken";
import { Gadget } from "./models/Gadget.js";
import { v4 as uuidv4 } from "uuid";
import { faker } from '@faker-js/faker';
import { TryCatch, ErrorHandler } from "./error.js";


// Login handler
const login = TryCatch(async (req, resp, next) => {
    const { secretCode } = req.body;
    if (secretCode == process.env.ADMIN_SECRETCODE) {
        const token = await jwt.sign({ secretCode , admin:true}, "abcdef");
        return resp.cookie("user-token", token, {
            maxAge: 1000 * 60 * 60 * 24 * 15 // 15 days
        }).send("login successfully");
    }
    else if (secretCode == process.env.NORMAL_USER_SECRETCODE) {
      const token = await jwt.sign({ secretCode , admin:false}, "abcdef");
      return resp.cookie("user-token", token, {
          maxAge: 1000 * 60 * 60 * 24 * 15 // 15 days
      }).send("login successfully");
  }
     else {
        next(new ErrorHandler("PLEASE PROVIDE VALID SECRET CODE"));
    }
});


const fetch_all_gadgets = TryCatch(async(req, resp, next)=>{
  const gadgets = await Gadget.findAll();
  const response = gadgets.map((gadget) => ({
    ...gadget.toJSON(),
    missionSuccessProbability: `${Math.floor(Math.random() * 100)}%`,
  }));
  resp.json(response);
})


const add_new_gadget = TryCatch(async(req, resp, next)=>{
  const adjective = faker.word.adjective(); // Generates random adjectives
  const noun = faker.word.noun(); 
  const codename = `${adjective.charAt(0).toUpperCase() + adjective.slice(1)}${noun.charAt(0).toUpperCase() + noun.slice(1)}`; 
  const newGadget = await Gadget.create({ name: codename });
  resp.status(201).json(newGadget);
})


const update_gadget = TryCatch(async(req, resp, next)=>{
    const { id } = req.params;
  const updates = req.body;
  const gadget = await Gadget.findByPk(id);
  if (!gadget) return resp.status(404).send("Gadget not found.");
  await gadget.update(updates);
  resp.json(gadget);
})


const delete_gadget = TryCatch(async(req, resp, next)=>{
    const { id } = req.params;
  const gadget = await Gadget.findByPk(id);
  if (!gadget) return resp.status(404).send("Gadget not found.");
  await gadget.update({ status: "Decommissioned", decommissionedAt: new Date() });
  resp.json(gadget);
})


const self_destruct = TryCatch(async(req, resp, next)=>{

    const { id } = req.params;
    const gadget = await Gadget.findByPk(id);

    if (!gadget) {
      return resp.status(404).json({ error: "Gadget not found" });
    }

    if (gadget.status === "Destroyed") {
      return resp.status(400).json({ error: "Gadget is already destroyed" });
    }

    const confirmationCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    gadget.status = "Destroyed";
    await gadget.save();

    return resp.status(200).json({
        message: "Self-destruct sequence initiated successfully",
        confirmationCode: confirmationCode,
        gadget: {
          id: gadget.id,
          name: gadget.name,
          status: gadget.status,
        },
    });


})



export { login, fetch_all_gadgets, add_new_gadget, update_gadget, delete_gadget, self_destruct};
