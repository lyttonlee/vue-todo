import axios from 'axios';

const http = axios.create({
  baseURL: 'http://d.apicloud.com/mcm/api/todos',
  headers: {
    'X-APICloud-AppId': 'A6097530712543',
    'X-APICloud-AppKey': '8070D7AF-8778-9151-F8C8-2DFCC36F8DF5',
  },
});
