const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '6c78f4bca6b24878aefc9c5a1950264c'
   });

const invokeClarifai = (req,res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL ,req.body.image)
    .then(response => res.json(response))
    .catch(error => res.status("400").json("error while predicting face"))
}

const handleImage = (req,res,postgres) => {
    const {id} = req.body;
    postgres('dms_user')
    .where('user_id','=',id)
    .increment('entries',1)
    .returning('entries')
    .then(entries =>{
        res.json(entries[0]);
    })
    .catch(error =>{
        console.log(error)
        res.status("400").json("unable to update entries")
    })
}

module.exports = {
    handleImage,
    invokeClarifai
}