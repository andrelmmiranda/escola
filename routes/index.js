module.exports = server =>{
    const mongoose = require('mongoose');
    const { access } = require('../utils/dbAccess');
    const { readFileSync } = require('fs');
    const { responseError } = require('../utils/responseError');

    mongoose.connect(access(readFileSync('../access-mongodb.txt', { encoding:'utf8', flag:'r' }), 'escola'), { useNewUrlParser: true, useUnifiedTopology: true });

    const ProfessoresSchema = mongoose.model('professores', {
        nome: String,
        registro: String,
        disciplina: String,
        qtdHoras: Number,
    });

    server.get('/', (_, response)=>{
        response.redirect('/cadastrar');
    });

    server.get('/cadastrar', (_, response)=>{
        response.render('formCadastro');
    })

    server.post('/cadastrar', (request, response)=>{
        const professor = new ProfessoresSchema();

        professor.nome = request.body.nome;
        professor.registro = request.body.registro;
        professor.disciplina = request.body.disciplina;
        professor.qtdHoras = request.body.qtdHoras;

        professor.save(error =>{
            responseError(error, response, 'Erro de cadastro');

            response.render('formCadastro');
        })
    });

    server.get('/listar', (_, response)=>{
        ProfessoresSchema.find({}, (error, professores) => {
            responseError(error, response, "Erro ao consultar professores");
            
            response.render('listaProfessores', { professores });
        });
    })

    server.get('/deletar:id', (request, response)=>{
        ProfessoresSchema.deleteOne({_id: request.params.id}, (error, response)=>{
            responseError(error, response, 'Erro ao deletar professor');
        });

        response.redirect('/listar');
    });

    server.get('/atualizar:id', (request, response)=>{
        ProfessoresSchema.findById(request.params.id, (error, professor)=> {
            responseError(error, response, "Erro ao consultar livro");
    
            response.render('editarProfessor', { professor });
        });
    });

    server.post('/atualizar', (request, response)=>{
        ProfessoresSchema.findById(request.body.id, (error, professor)=>{
            responseError(error, response, "Erro ao atualizar professor");

            professor.nome = request.body.nome;
            professor.registro = request.body.registro;
            professor.disciplina = request.body.disciplina;
            professor.qtdHoras = request.body.qtdHoras;

            professor.save(error =>{
                responseError(error, response, "Erro ao atualizar professor");
        
                response.redirect('/listar');
            });
        });
    });
}