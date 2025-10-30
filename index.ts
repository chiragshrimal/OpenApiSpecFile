import express from "express";
import cors from "cors";

const app= express();

app.use(cors());

// signup end point 
app.post("/signup", (req,res)=>{
    
    const {email, password}= req.body();
    
    if(!email || !password){
        return res.send({
            message : "please provide the all information"
        })
    }
    res.send({
        message : "you have signup "
    })
});

// signin end point 
app.get("/signin",(req,res)=>{
    const {email, password}= req.body();

    if(!email || !password){
        return res.send({
            message : "please provide the all the information"
        })
    }

    res.send({
        token:"jwt_token"
    })

});

// helth check 
app.get("/health", (req,res)=>{
    res.send({
        message : "i am working fine"
    })
})

// create the todo
app.post("/createTodo",(req,res)=>{
    
    const {title, description}= req.body();

    if(!title || !description){
        return res.send({
            message : "please provide all the information"
        })
    }

    res.send({
        todo: [
            {
                id : "todo_id",
                status : "done"
            }
        ]
    });
});


// list of the todo

app.get("allTodo", (res,req)=>{

    const {email}= req.body();

    if(!email){
        return res.send({
            message : "please provide correct email id"
        });
    }

    res.send({
        todo: [
            {
                id : "1",
                title: "gym",
                description : "i have done for the two hour"
            },
            {
                id : "2",
                title: "playing",
                description : "today, i play cricket "
            }
        ]
    });
});

app.listen(3000,()=>{
    console.log("running the server at http://localhost:3000");
})



