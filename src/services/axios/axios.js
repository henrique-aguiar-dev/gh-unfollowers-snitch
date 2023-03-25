import axios from "axios";

const ghApi = axios.create({
	baseURL: 'https://api.github.com/',
})

ghApi.interceptors.request.use(async config => {
	if (process.env.REACT_APP_GHTOKEN) ghApi.defaults.headers.authorization = `Bearer ${process.env.REACT_APP_GHTOKEN}`;

  return config;
});

export default ghApi;