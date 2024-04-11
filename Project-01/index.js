const express = require("express");
const fs = require("fs");
const users = require("./data.json");


const app = express();
const PORT = 3000;

// Middlewares - almost like plugin in express
app.use(express.urlencoded({ extended: false }));
// custom middleware
app.use((req, res, next) => {
    console.log("Hello from middleware 1");
    req.myusername = "Karan";
    // return res.json({ msg: "Hello from middleware."}); to return the request here.
    next();
});
app.use((req, res, next) => {
    console.log("Hello from middleware 2", req.myusername);
    // return res.json({ msg: "Hello from middleware."}); to return the request here.
    next();
});

// Routes
app.get('/users', (req, res) => {
    const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `
    res.send(html);
})

app.get('/api/users', (req, res) => {
    return res.json(users);
});

app
    .route('/api/users/:id')
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);
        return res.json(user);
    })
    .patch((req, res) => {
        const id = Number(req.params.id);
        const body = req.body;
        const index = users.findIndex(user => user.id === id);
        if(index !== -1){
            users[index] = {...users[index], ...body};
            fs.writeFile('./data.json', JSON.stringify(users), (err, data) => {
                return res.json({ status: "updated", id: id });
            });
        }else{
            return res.json({ status: "Id not found"});
        }
    })
    .delete((req, res) => {
        const id = Number(req.params.id);
        const index = users.findIndex(user => user.id === id);
        if(index !== -1){
            users.splice(index, 1);
            fs.writeFile("./data.json", JSON.stringify(users), (err, data) => {
                return res.json({ status: "deleted" });
            });
        }else{
            return res.json({ status: "Id not found"});
        }
    })

app.post('/api/users', (req, res) => {
    const body = req.body;
    // users.push({
    //     first_name: body.first_name,
    //     last_name: body.last_name,
    //     email: body.email,
    //     gender: body.gender,
    //     job_title: body.job_title
    // });
    users.push({id: users.length + 1,...body});
    fs.writeFile("./data.json", JSON.stringify(users), (err, data) => {
        return res.json({ status: "success", id: users.length});
    })
});

// app.patch('/api/users/:id', (req, res) => {
//     // TODO: Edit the user with id
//     return res.json({ status: "pending"});
// });

// app.delete('/api/users/:id', (req, res) => {
//     // TODO: Delete the user with id
//     return res.json({ status: "pending"});
// });

app.listen(PORT, () => console.log(`Server started at Port: http://localhost:${PORT}/`));