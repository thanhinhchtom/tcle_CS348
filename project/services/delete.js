const in_product = require('../utils/tables/in_products');
const util = require('../utils');

async function del(product) {
    const productName = product.name;

    if (!(product && productName)) {
        return util.buildResponse(401, { message: 'Name is required!' });
    }

    let result = "";

    await in_product.destroy({
        where: {
            name: productName,
        }
    })
    .then((numDeleted) => {
        if (numDeleted == 1) {
            result = 'Product ' + productName + ' deleted successfully!';
            // return util.buildResponse(200, { message: 'Product ' + productName + ' deleted successfully!' });
        } else {
            result = 'Product ' + productName + ' not found!';
            // return util.buildResponse(200, { message: 'Product ' + productName + ' not found!'});
        }
    })
    .catch(() => {
        result = 'Error deleting product ' + productName + '!';
        // return util.buildResponse(200, { message: 'Error deleting product ' + productName + '!' });
    });

    return util.buildResponse(200, { message: result });
}

module.exports.del = del;