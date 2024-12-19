import fs from 'fs';
import config from '../config/config.js';

export const getData = () => {
    const rawData = fs.readFileSync(config.dataFilePath, 'utf8');
    return JSON.parse(rawData);
};

export const saveData = (data) => {
    fs.writeFileSync(config.dataFilePath, JSON.stringify(data, null, 2));
};
