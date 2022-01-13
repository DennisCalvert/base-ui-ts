import api from './base-api';

const baseRoute = '/subscriptions';

const get = async (id) => {
    const res = await api.get(baseRoute, { id });
    return res;
};

const list = async () => await api.get(`${baseRoute}/list`);

const create = async (data) => await api.post(baseRoute, { ...data })

const destroy = async (id) => await api.delete(baseRoute, { id });

export default {
    get,
    list,
    create,
    destroy,
};
