import { getConnection } from './index.js';

const client = await getConnection().collection('habits');

