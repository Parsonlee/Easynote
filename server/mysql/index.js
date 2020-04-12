const mysql = require('mysql');

const client = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
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
