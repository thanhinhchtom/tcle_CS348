const in_product = require('../utils/tables/in_products');
const util = require('../utils');

async function update(product) {
    const productName = product.name;
    const productQuantity = product.quantity;
    const productPerson_id = product.person_id;

    if (!(product && productName && productQuantity && productPerson_id)) {
        return util.buildResponse(401, { message: 'Name, quantity, and Modified person are required!' });
    }

    const updateProduct = await in_product.findOne({
        where: {
            name: productName
        }
    });

    if (updateProduct === null) {
        return util.buildResponse(200, { message: 'Product not exist!' });
    }
    updateProduct.quantity = productQuantity;
    updateProduct.person_id = productPerson_id;
    await updateProduct.save();
    return util.buildResponse(200, { message: 'Product ' + updateProduct.name + '\'s quantity changed!' });
}

module.exports.update = update;