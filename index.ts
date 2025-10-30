import express from "express";
import cors from "cors";
const app= express();

// install the dependency of the swaggerUi 
import swaggerUi from 'swagger-ui-express'
import fs from "fs"
// we have writtern spec file in the yml 
// so install yml also required
import YAML from "yaml"

// real the file and parse the file 
const file  = fs.readFileSync('./spec.yml', 'utf8')
const swaggerDocument = YAML.parse(file)

// this end point give the swaggerUi 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors());

// signup - POST /signup
app.post("/signup", (req, res) => {
  const { email, password } = req.body ?? {};
  if (!email || !password) {
    return res.status(400).json({ message: "please provide all information" });
  }
  return res.status(201).json({ message: "you have signed up" });
});

// signin 
app.post("/signin", (req, res) => {
  const { email, password } = req.body ?? {};
  if (!email || !password) {
    return res.status(400).json({ message: "please provide all information" });
  }
  return res.status(200).json({ token: "jwt_token" });
});

// health check
app.get("/health", (_req, res) => {
  return res.status(200).json({ message: "i am working fine" });
});

// create todo
app.post("/createTodo", (req, res) => {
  const { title, description } = req.body ?? {};
  if (!title || !description) {
    return res.status(400).json({ message: "please provide all the information" });
  }
  return res.status(201).json({
    todo: [{ id: "todo_id", title, description, status: "done" }],
  });
});

// list todos - correct param order and accept email in query or body
app.get("/todoList", (req, res) => {
  const email = (req.query.email as string) || req.body?.email;
  if (!email) {
    return res.status(400).json({ message: "please provide correct email id" });
  }
  return res.status(200).json({
    todo: [
      { id: "1", title: "gym", description: "i have done for the two hour" },
      { id: "2", title: "playing", description: "today, i play cricket" },
    ],
  });
});

app.listen(3000,()=>{
    console.log("running the server at http://localhost:3000");
})



