const mysql = require('mysql');

const client = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'easynote'
});

const sqlFn = (sql, arr) => {
	return new Promise((resolve, reject) => {
		client.query(sql, arr, function(error, results) {
			if (error) throw error;
			resolve(results);
		});
	});
};

module.exports = sqlFn;