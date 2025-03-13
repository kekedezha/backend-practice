import { Router } from "express";

const router = Router();

// GET route to retrieve user id for 'cdezha' user in seeded database
router.get("/", async (req, res) => {
  const user = await req.context.models.User.findByPk(req.context.me.id);
  return res.send(user);
});

export default router;
