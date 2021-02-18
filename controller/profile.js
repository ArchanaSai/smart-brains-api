const handleProfileGet = (req,res,postgres) => {
    const {id} = req.params;
    console.log('invoking profile api')
    postgres
    .select('name','email','joined_date','user_id')
    .from('dms_user')
    .where('user_id','=',id)
    .then(user =>{
        if(user.length){
            res.json(user);
        }else{
            res.status("404").json("no such user");
        }
    }).catch(error=>{
        console.log("unable to retrieve user info ", error)
    })
}

module.exports = {
    handleProfileGet
}