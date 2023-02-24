const Product = require('../productDB').getModel();

module.exports = async (req, res, next) => {
  try {
    const products = await Product.find({});
    const results = products.map((pro) => {
      return {
        id: pro._id,
        product: pro.productName,
        description: pro.description,
        price: pro.price,
        quantity: pro.quantity,
      };
    });

    if (req.query.format === 'xml') {
      let xml = '<data>';
      for (let i = 0; i < results.length; i++) {
        xml += '<product>';
        xml += `<id>${results[i].id}</id>`;
        xml += `<productname>${results[i].product}</productname>`;
        xml += `<description>${results[i].description}</description>`;
        xml += `<price>${results[i].price}</price>`;
        xml += `<quantity>${results[i].quantity}</quantity>`;
        xml += '</product>';
      }
      xml += '</data>';

      res.set('Content-Type', 'text/xml');
      res.send(xml);
    } else {
      // return JSON format by default
      res.json({ data: results });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving products');
  }
};
