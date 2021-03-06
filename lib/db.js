"use strict";
import Promise from "bluebird";
import settings from "../settings.js";
import mysql from "mysql";

//Promise all the things!
Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);

//create config object
const db_config = {
	hostname : "localhost",
	user : settings.user,
	password : settings.password,
	database : settings.database
}

//create db connection pool
const con = mysql.createPool(db_config);

/*
	Function to take in a basic SQL query, and return results if it's a select
	@param sql string to run query
 */
async function query(sql, params) {
	const connection = await con.getConnectionAsync();
	return connection.queryAsync(sql,params)
		.then(rows => rows)
		.finally(() => connection.release());
}

//export db methods for use
export {query};