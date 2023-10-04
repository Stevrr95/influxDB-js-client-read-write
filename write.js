'use strict'
/** @module write
 * Writes a data point to InfluxDB using the Javascript client library with Node.js.
**/

import { InfluxDB, Point } from '@influxdata/influxdb-client'
import dotenv from "dotenv"
dotenv.config();

/** Environment variables **/
const url = process.env.INFLUX_URL
const token = process.env.INFLUX_TOKEN
const org = process.env.INFLUX_ORG
const bucket = process.env.INFLUX_BUCKET

/**
 * Instantiate the InfluxDB client
 * with a configuration object.
 **/
const influxDB = new InfluxDB({ url, token })

/**
 * Create a write client from the getWriteApi method.
 * Provide your `org` and `bucket`.
 **/
const writeApi = influxDB.getWriteApi(org, bucket)

/**
 * Apply default tags to all points.
 **/
writeApi.useDefaultTags({ region: 'east' })

/**
 * Create a point and write it to the buffer.
 **/
const point1 = new Point('temperature')
    .tag('sensor_id', 'TLM01')
    .floatField('value', 24.0)
console.log(`${point1}`)

writeApi.writePoint(point1)

const point2 = new Point('temperature')
    .tag('sensor_id', 'TLM02')
    .floatField('value', 26.4)
console.log(`${point2}`)

writeApi.writePoint(point2)

/**
 * Flush pending writes and close writeApi.
 **/
writeApi.close().then(() => {
    console.log('WRITE FINISHED')
})