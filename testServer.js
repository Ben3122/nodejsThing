const express = require("express");
const qr = require("qrcode");

const app = express();
const MongoClient = require('mongodb').MongoClient;
const items = [
    { id: "1", location : "a", name: 'Item 1', renamingStock : 5 },
    { id: "1", location : "a", name: 'Item 2', renamingStock : 5 },
    { id: "1", location : "a", name: 'Item 3', renamingStock : 5 }
  ];

  const uri = 'mongodb://127.0.0.1:27017'; // Replace with your MongoDB server URI
 
  // Replace the uri string with your MongoDB deployment's connection string.



  const postRequstStart = `
  <!DOCTYPE html>
<html>
<head>
    <title>Number Input and POST Request Example</title>
</head>
<body>
    <h1>Number Input and POST Request Example</h1>
    <form id="updateForm">
        <label for="numberInput">Enter a Number:</label>
        <input type="number" id="numberInput" name="numberInput" required>
        <button type="submit">Update Item</button>
    </form>

    <script>
        document.getElementById("updateForm").addEventListener("submit", async function(event) {
            event.preventDefault();
            
            const numberInput = document.getElementById("numberInput").value;
            const id = "`
const postRequestEnd = `"; // Hardcoded ID
            
            const data = {
                id: id,
                quantity: numberInput
            };
            
            try {
                const response = await fetch("/update-item", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({id : "Halley's_Comet", quantity:5 })
                });

                if (response.ok) {
                    console.log("POST request successful");
                } else {
                    console.error("POST request failed");
                }
            } catch (error) {
                console.error("An error occurred:", error);
            }
        });
    </script>
</body>
</html>
`

  

































  async function itemWrite() {
  


    const client = new MongoClient(uri);
    
    
      try {
        await client.connect();
        console.log('Connected to the database');


        const db = client.db("rocket_tracking");
        const coll = db.collection("rockerty_item_tracker");

        const docs = [
          {qrCode: "Halley's_Comet", itemName: "1P/Halley", quantity: 75, location: "apples"},
        ];

        const result = await coll.insertMany(docs);


        console.log(result.insertedIds);
        // You can now perform database operations here
      } catch (error) {
        console.error('Error connecting to the database:', error);
      }
    
  }

  async function queryBy(jsonData){
    const client = new MongoClient(uri);
    try {
      client.connect();
      console.log('Connected to the databaseioioio');


      const db = client.db("rocket_tracking");
      const coll = db.collection("rockerty_item_tracker");
      const cursor = coll.find(jsonData);
      const results = [];
      console.log("heresss");
      for await (const doc of cursor) {
        results.push([doc.qrCode, doc.itemName, doc.quantity, doc.location]);
      }
      console.log(results);
      console.log("here");
      return results;





      // You can now perform database operations here
    } catch (error) {
      console.error('Error connecting to the database:', error);
    }


  }



  async function updateQuantityById(id, changeAmount) {
    const client = new MongoClient(uri);
    try {
      await client.connect();
      console.log('Connected to the database');
  
      const db = client.db('rocket_tracking'); // Replace with your database name
      const collection = db.collection('rockerty_item_tracker'); // Replace with your collection name
  
      const filter = { qrCode : id };
      const update = { $inc: { quantity : changeAmount } };
  
      const result = await collection.updateOne(filter, update);
  
      if (result.modifiedCount === 1) {
        console.log('Quantity updated successfully');
        return true;
      } else {
        console.log('No matching document found');
        return false;
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      return false;
    } finally {
      client.close();
    }
  }



  async function deleteRecordById(id) {
    const client = new MongoClient(uri);
    try {
      await client.connect();
      console.log('Connected to the database');
  
      const db = client.db('rocket_tracking'); // Replace with your database name
      const collection = db.collection('rockerty_item_tracker'); // Replace with your collection name
  
      const result = await collection.deleteOne({ qrCode : id });
  
      if (result.deletedCount === 1) {
        console.log('Record deleted successfully');
      } else {
        console.log('No matching document found');
      }
    } catch (error) {
      console.error('Error deleting record:', error);
    } finally {
      client.close();
    }
  }


app.get("/", (req, res) => {
  itemWrite();
    const randomValue = Math.random().toString(36).substring(7);

    qr.toDataURL(randomValue, {type:'png', }, (err,url) => {
        res.send(`<img src="${url}"/>`);
    });
});






app.get("/a", (req, res) => {
  var tempquery = {qrCode : "Halley's Comet"}
  queryBy (tempquery);

    const randomValue = Math.random().toString(36).substring(7);

    qr.toDataURL(randomValue, {type:'png', }, (err,url) => {
        res.send(`<img src="${url}"/>`);
    });
});


app.get("/aa", (req, res) => {
  var tempquery = {qrCode : "Halley's Comet"}
  deleteRecordById ("Halley's Comet");

    const randomValue = Math.random().toString(36).substring(7);

    qr.toDataURL(randomValue, {type:'png', }, (err,url) => {
        res.send(`<img src="${url}"/>`);
    });
});



app.get('/findItem', (req, res) => {
  const Code = req.query.Code;

  if (!Code) {
    return res.status(400).json({ error: 'qrCode parameter is missing' });
  }
  var tempquery = {qrCode : Code}
  const results = queryBy (tempquery);
  let htmlContent = "<h1>Result founnd</h1>";
  results.then(function (value)
  {
    console.log("big problem");
    console.log(value);
    for (const val of value){
      console.log("ss");
      var piple1 = '' + val[2];
  
      htmlContent += "<p>" + val[0]+ "</p>" + "<p>" + val[2]+ "</p>" + "<p>" + piple1+ "</p>" + "<p>" + val[3]+ "</p>"

      htmlContent += postRequstStart;
      htmlContent += val[0];
      htmlContent += postRequestEnd;

      res.send(htmlContent);
    }
    console.log("big problemsdsdsd");
  },
  function(err)
  {
    console.log(err);

    
  }
  );


  console.log("===========================");



});




app.post('/query-item', (req, res) => {
    const queryNumber = req.body.number;
    const queriedItem = items.find(item => item.id === queryNumber);
  
    if (queriedItem) {
      res.status(200).json(queriedItem);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  });


app.post('/upload-item', (req, res) => {
    const { name, location, quantity } = req.body;
  
    if (!name || !location) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }
    const randomValue = Math.random().toString(36).substring(7);
    const newItem = {
      id: randomValue,
      name: name,
      location: location,
      renamingStock : quantity
    };
  
    items.push(newItem);
  
    res.status(201).json(newItem);
  });


  app.post('/update-item', (req, res) => {
    console.log(req.header);   
  
    //res.status(201).json(newItem);
  });

app.listen(3000, () => {
    console.log("Listening to port 3000");
  });
