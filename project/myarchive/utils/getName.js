const in_products = require('./tables/in_products');

async function checkIfNameExists(nameToCheck) {
    try {
        // Use Sequelize's findOne method to find a record with the given name
        const [existingProduct] = await in_products.findOne({
            where: {
                name: nameToCheck,
            }
        });

        // If no record is found, the name doesn't exist
        if (existingProduct.rows === null) {
            return true;
        }
        
        // If a record is found, it means the name already exists
        return false;
    } catch (error) {
        console.error('Error checking if name exists:', error);
        throw error;
    }
}

module.exports.checkIfNameExists = checkIfNameExists;