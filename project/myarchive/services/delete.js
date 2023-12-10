const in_product = require('../utils/tables/in_products');
const util = require('../utils');

async function del(product) {
    const productName = product.name;

    if (!(product && productName)) {
        return util.buildResponse(401, { message: 'Name is required!' });
    }

    await in_product.destroy({
        where: {
            name: productName,
        }
    })
    .then((numDeleted) => {
        if (numDeleted == 1) {
            return util.buildResponse(200, { message: 'Product ' + productName + ' deleted successfully!' });
        } else {
            return util.buildResponse(200, { message: 'Product ' + productName + ' not found!'});
        }
    })
    .catch(() => {
        return util.buildResponse(200, { message: 'Error deleting product ' + productName + '!' });
    })
}

module.exports.del = del;