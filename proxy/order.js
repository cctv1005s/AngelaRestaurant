var mysql = require('../models/index');

exports.setReserve = function*(preOrder){
    var query = `
    INSERT INTO \`Order\`(\`ID\`, \`UserID\`, \`OrderTime\`, \`Phone\`, \`Type\`, \`Status\`,  \`PeopleNum\`)
     VALUES  ('${preOrder.OrderID}', '${preOrder.UserId}', '${preOrder.OrderTime}', 
     '${preOrder.Phone}',  ${preOrder.Type}, '${preOrder.Status}', '${preOrder.PeopleNum}')
    `;
    console.log(query);
    return yield mysql.query(query);
}   