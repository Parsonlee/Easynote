const mysql = require('mysql');

const client = mysql.createConnection({
	host: '121.36.26.183',
	user: 'root',
	password: 'Yzh0096412...',
	database: 'easynote',
	timezone: '08:00',	//修改时区
});

const sqlFn = (sql, arr) => {
	return new Promise((resolve, reject) => {
		client.query(sql, arr, function (error, results) {
			if (error) throw error;
			resolve(results);
		});
	});
};

module.exports = sqlFn;
