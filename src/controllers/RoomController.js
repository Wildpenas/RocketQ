const Database = require('../db/config')

module.exports ={

    async create(req,res){

        const db = await Database()

        const pass = req.body.password
        let roomId = 0

        let isRoom = true

        while(isRoom){
            //gera o numero da sala 
            for(var i = 0; i < 6; i++){

                i == 0 ? roomId = Math.floor(Math.random() * 10).toString() :
                roomId += Math.floor(Math.random() * 10).toString()

            }

            // verifica se o numero de sala ja existe no banco de  dados
            const roomsExistids = await db.all(`SELECT id FROM rooms`)

            isRoom = roomsExistids.some(roomsExistids => roomsExistids === roomId)

            if(! isRoom){
                // inseri a sala no banco de dados
                db.run(`INSERT INTO rooms(
                    id,
                    pass
                    ) VALUES(
                        ${parseInt(roomId)},
                        ${pass}
                    )
                `)
            }

        }

       

        

        await db.close()

    res.redirect(`/room/${roomId}`)
    },

    async open(req,res){

        const db = await Database()
        const roomId = req.params.room
        const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 0`)
        const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 1` )
        
        let isNoQuestions

        if(questions.length == 0){
            if(questionsRead == 0){
                isNoQuestions = true
                 
            }
        }
        
        
        res.render('room', {roomId, questions, questionsRead, isNoQuestions})
    },

    enter(req, res){
        const roomId = req.body.roomId
        res.redirect(`/room/${roomId}`)
        
    }

}