const express = require('express');
const app = express();
const PORT = 3000;
const URI = 'http://127.0.0.1:3000/'
app.use(express.json());

var inMemoryStore = {}
var likeCounter = 0
//Add to memory endpoint
app.post('/snippets', async (req, resp) => {
    try
    {
        var currentTimestamp = new Date(Date.now())
        var newReq = {
            "url": URI + 'snippets/' +req.body['name'],
            "name": req.body['name'],
            "expires": new Date (currentTimestamp
                .setSeconds(currentTimestamp
                .getSeconds() + req.body['expires_in'])), //adding value in seconds 
            "snippet" : req.body['snippet']
        }
        inMemoryStore[req.body['name']] = newReq
        return resp.status(201).json(newReq)
    }
    catch (error)
    {
        console.log("Something went wrong with error : " + error)
    }
})

//Like endpoint
app.post('/snippets/:name/like', async (req, resp) => {
    try
    {        
        if (req.params['name'] in inMemoryStore ) 
        {   likeCounter = likeCounter + 1
            inMemoryStore[req.params['name']]['expires']
            .setSeconds(inMemoryStore[req.params['name']]['expires']
            .getSeconds() + 30)
            inMemoryStore[req.params['name']]['like'] = likeCounter
            console.log(inMemoryStore)
            return resp.status(200).json(inMemoryStore[req.params['name']])
        }
        else
        {
            return resp.status(404).json()
        }
    }
    catch (error)
    {
        console.log("Something went wrong with error : " + error)
    }
})

//Fetch from memory endpoint
app.get('/snippets/:name', async (req, resp) => {

    try
    {   
        if (req.params['name'] in inMemoryStore ) {
            var currentTimestamp = new Date(Date.now())
            var recordTimestamp = inMemoryStore[req.params['name']]['expires']
            var isExpired = recordTimestamp > currentTimestamp
            if (isExpired == true){
                (inMemoryStore[req.params['name']]['expires'])
                .setSeconds(inMemoryStore[req.params['name']]['expires']
                .getSeconds() + 30)
                return resp.status(200).json
                (inMemoryStore[req.params['name']])
            } 
        }
        else
        {  
            return resp.status(404).json()
        }
    }
    catch (error)
    {
        console.log("Something went wrong with error : " + error)
    }

})

app.listen(PORT, () => console.log(`Eth client running on port ${PORT}`));