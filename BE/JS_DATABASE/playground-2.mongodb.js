// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('_vta_DA_DB');

// Insert a few documents into the printers collection.
db.getCollection('Printer').insertMany([
  { 'model': 'Canon 3301', 'id': 'CN_23458', 'location': 'H3-301', 'weight': '250kg', 'status': 'Hoạt động', 'num_paper': 199 },
  { 'model': 'Canon 3301', 'id': 'CN_23459', 'location': 'H3-301', 'weight': '250kg', 'status': 'Hoạt động', 'num_paper': 199 },
  { 'model': 'Canon 3301', 'id': 'CN_23460', 'location': 'H3-301', 'weight': '250kg', 'status': 'Hoạt động', 'num_paper': 199 },
  { 'model': 'Dell GTM 302', 'id': 'DE_11347', 'location': 'H1-301', 'weight': '100kg', 'status': 'Hoạt động', 'num_paper': 199 }
]);

// Find all printers
db.getCollection('Printer').find({});
console.log(db.getCollection('Printer').find({}));

// Find a specific printer by ID
db.getCollection('Printer').find({ id: 'CN_23458' });
console.log(db.getCollection('Printer').find({ id: 'CN_23458' }));

// Update the status of a printer
db.getCollection('Printer').updateOne(
  { id: 'CN_23458' },
  { $set: { status: 'Không hoạt động' } }
);
console.log(db.getCollection('Printer').find({}));

// Delete a printer by ID
//db.getCollection('Printer').deleteOne({ id: 'CN_23458' });

// Count the number of printers
//db.getCollection('Printer').countDocuments();