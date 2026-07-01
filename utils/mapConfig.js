import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding.js";

import dotenv from "dotenv";
dotenv.config();

const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

export default geocodingClient; 