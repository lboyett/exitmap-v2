import pool from "../pool-config";

export async function getExit(id: string) {
	return new Promise((resolve) => {
		pool.query(
			"SELECT * FROM exits WHERE _id = $1",
			[id],
			(err, results) => {
				if (err) {
					console.log(err);
				}
				resolve(results.rows)
			}
		)
	})
}
