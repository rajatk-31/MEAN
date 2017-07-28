var express = require('express');
var port = 3000;
var app = express();
var bodyParser = require('body-parser')
var dog = require('./models/dog')

var mongoose = require('mongoose');
mongoose.connect('mongodb://rajatk_31:Plmnko09876@ds125053.mlab.com:25053/meanfirst');

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));


app.post('/dogName', function(req, res) {
    var dogName = req.body.name;
    console.log("PARAMETER FROM FORM")

    dog.findOne({ 'name': dogName }, function(err, data) {
        if (err) {
            console.log(err)
            res.end("SOME ERROR OCCURED")
        }
        console.log(data)

        res.json(data)
    })

})

app.post('/registerNewDogy',function(req,res){
    var dog1 = new dog({'name':req.body.name,'age':req.body.age,'collar_id':req.body.collar_id})
    dog1.save(function(err,data){
        if(err){
            console.log(err)
        }
        res.json(data)
    })
})

app.put('/updateDogy',function(req,res){
    var dogid = req.body.collar_id;
    var dog2={'name':req.body.name,'age':req.body.age,'collar_id':dogid}
    dog.findOneAndUpdate({collar_id: dogid}, {$set:dog2}, {new: true}, function(err, doc){
    	if(err){
    		console.log(err)
    	}
        res.json(data)
	})
})
/*
app.delete('/deletedogy'function(req,res){
	var dogid=req.body.collar_id;

})*/



app.get('/listofdogy',function(req,res){
    dog.find(function(err,data){
        if (err) {
            console.log(err)
            res.end("SOME ERROR OCCURED")
        }
        res.json(data)
    })
})

app.listen(port, function() {
    console.log('The server is running, ' +
        ' please open your browser at http://localhost:%s',
        port);
});
