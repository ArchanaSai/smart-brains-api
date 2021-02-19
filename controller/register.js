const handleRegister = (req,res,postgres,bcrypt) => {
    const currentDate = new Date()
    const active = 'Y'
    const {email,name,password} = req.body
    if(!email || !password || !name){
        return res.status("400").json("invalid form submission")
    }
    const hashPassword = bcrypt.hashSync(password);
    postgres
    .transaction(txnObj =>{
        txnObj.insert({
            'email': email,
            'password': hashPassword,
            'active': active,
            'created_by': name,
            'created_date': currentDate,
            'updated_by': name,
            'updated_date': currentDate
        })
        .into('dms_login')
        .then(data => {
            return txnObj('dms_user')
            .insert({
                'name': name,
                'email': email,
                'joined_date': currentDate,
                'entries': 0,
                'active': active,
                'created_by': name,
                'created_date': currentDate,
                'updated_by': name,
                'updated_date': currentDate
            }) 
            .returning('*')
            .then(user => {
                res.json(user[0]);
              })
            .catch(error => {
                console.log("exception while saving login information",error)
            })
        })
        .then(txnObj.commit)
        .catch(error=>{
            txnObj.rollback
            console.log("error while registering",error)
        })
    })
    .catch(error=>{
        console.log(error)
        res.json("unable to register").status("400");
    })
}

module.exports = {
    handleRegister
}