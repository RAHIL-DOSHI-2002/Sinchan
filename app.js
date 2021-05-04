const bodyParser = require("body-parser");
const express = require("express");
const { post } = require("request");
const request = require("request");
const https = require("https");
const app = express();
app.use(express.static("Public"));
app.use(bodyParser.urlencoded({extended:true}));




app.get("/",function(req,res){
    res.sendFile(__dirname+"/sign-up.html")
});

app.post("/",function(req,res){
    const firstName= req.body.fname;
    const lastName= req.body.lname;
    const email = req.body.email;
    const data={
        members:[{
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME:lastName
            }
        }]
    }
    const jsonData = JSON.stringify(data);
     const url = "https://us1.api.mailchimp.com/3.0/lists/539d4939f6"

        const options = {
            method:"post",
            auth:"rahil:b8415f16aca6d452ee0f4631835aad86-us1"
        }




    const request = https.request(url,options,function(response){
        var statusCose= response.statusCode
        if(response.statusCode===200){
            res.send("Success")
            }
            else{
            res.send("Failed")
            }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })

request.write(jsonData);
request.end();





    // console.log(firstName , lastName , email);
})

app.listen(process.env.PORT||3000,function(){
    console.log("ok tested")
});


// api key
// b8415f16aca6d452ee0f4631835aad86-us1

//id is : 539d4939f6