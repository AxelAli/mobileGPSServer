import NodeGeocoder from 'node-geocoder';

const options = {
  provider: "mapquest",
  httpAdapter: 'https',
  apiKey: "1nJe2C4MypZKymNvHbsUMdxgay6AaW3Y",
  formatter: null
};

const geocoder = NodeGeocoder(options);

export default geocoder;
