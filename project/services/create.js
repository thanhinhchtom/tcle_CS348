const in_product = require('../utils/tables/in_products');
const util = require('../utils');

async function create(product) {
    const productName = product.name;
    const productQuantity = product.quantity;
    const productPerson_id = product.person_id;

    if (!(product && productName && productQuantity && productPerson_id)) {
        return util.buildResponse(401, { message: 'Name, quantity, and Modified person are required!' });
    }

    const [newProduct, created] = await in_product.findOrCreate({
        where: {
            name: productName,
        },
        defaults: {
            quantity: productQuantity,
            person_id: productPerson_id,
        }
    });

    if (!created) {
        return util.buildResponse(200, { message: 'Product name already existed!' });
    }

    return util.buildResponse(200, { message: 'Product ' + newProduct.name + ' created successfully by person with id: ' + newProduct.person_id });
}

module.exports.create = create;