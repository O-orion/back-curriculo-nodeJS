const pool = require('../config/db');

class Curriculum {
    static async create(userId, data) {
        const result = await pool.query(
            'INSERT INTO curriculums (user_id, data) VALUES ($1, $2) RETURNING *',
            [userId, data]
        );

        return result.rows[0];
    }

    static async findByUser(userId) {
        const result = await pool.query(
            'SELECT * FROM curriculums WHERE user_id = $1',
            [userId]);
        return result.rows;
    }

    static async update(id, data) {
        const result = await pool.query(
            'UPDATE curriculums SET data = $1 WHERE id = $2 RETURNING *',
            [data, id]
        )
        return result.rows[0];
    }

    static async delete(id) {
        const result =await pool.query(
            'DELETE FROM curriculums WHERE id = $1 RETURNING *',
            [id]
        )

        return result.rows[0]
    }
}

module.exports = Curriculum;
