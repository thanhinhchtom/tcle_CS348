const sequelize = require('./utils/connection');
const createService = require('./services/create');
const readService = require('./services/read');
const updateService = require('./services/update');
const deleteService = require('./services/delete');
const util = require('./utils');

const healthPath = '/health_input';
const createPath = '/create_input';
const readPath = '/read_input';
const updatePath = '/update_input';
const deletePath = '/delete_input';

exports.handler = async (event) => {
    // Create or do nothing if tables exist
    await sequelize.sync();

    let response;

    switch (true) {
        case event.httpMethod === 'GET' && event.path === healthPath:
            response = util.buildResponse(200, 'Input Health');
            break;
        
        case event.httpMethod === 'GET' && event.path === readPath:
            response = await readService.read();
            break;

        case event.httpMethod === 'POST' && event.path === createPath:
            const createBody = JSON.parse(event.body);
            response = await createService.create(createBody);
            break;

        case event.httpMethod === 'POST' && event.path === updatePath:
            const updateBody = JSON.parse(event.body);
            response = await updateService.update(updateBody);
            break;

        case event.httpMethod === 'POST' && event.path === deletePath:
            const deleteBody = JSON.parse(event.body);
            response = await deleteService.del(deleteBody);
            break;

        default:
            response = util.buildResponse(404, "404 Not Found");
    }

    return response;
};

