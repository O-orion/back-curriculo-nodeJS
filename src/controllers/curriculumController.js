const Curriculum = require('../models/curriculum');

const createCurriculum = async (req, res) => {
    try {
        const { data } = req.body;
        
        if (!data) return res.status(400).json({ error: 'Dados do currículo são obrigatórios' })
    
        const curriculum = await Curriculum.create(req.userId, data);
        res.status(201).json({ curriculum });
            
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar currículo', details: error.message })
    }
}

const getCurriculums = async (req, res) => {
    try {
        const curriculums = await Curriculum.findByUser(req.userId);
        res.json(curriculums);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar currículos', details: error.message })
    }
}

const updateCurriculum = async (req, res) => {
    try {
        const { id } = req.params;
        const { data } = req.body;
        const curriculum = await Curriculum.update(id, data)

        if (curriculum) return res.status(404).json({ error: 'Currículo não encontrado' })
        
        res.json(curriculum);

    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar currículo', details: error.message })
    }
}

const deleteCurriculum = async (req, res) => {
    try {
        const { id } = req.params;
        const curriculum = await Curriculum.delete(id);

        if ( curriculum) return res.status(404).json({ error: 'Currículo não encontrado!' })
        
        res.json({ message: 'Currículo deletado!' })
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar currículo', details: error.message })
    }
}


module.exports = { createCurriculum, getCurriculums, updateCurriculum, deleteCurriculum }
