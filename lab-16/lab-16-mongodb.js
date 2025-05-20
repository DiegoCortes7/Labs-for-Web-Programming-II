// Switch to the lab16 database
use lab16

// Insert a document into lab_collection
db.lab_collection.insertOne({
  name: "Test Name",
  value: "Test Value"
})

// View the inserted document
db.lab_collection.find().pretty()