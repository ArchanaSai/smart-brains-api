const handleSignin = (req,res,postgres,bcrypt) => {
    const{email,password} = req.body
    if(!email || !password){
        return res.status("400").json("invalid form submission")
    }
    postgres.select('*')
        .from('dms_login')
        .where('email','=',email)
        .then(data => {
            if(data.length){
                const isValid = bcrypt.compareSync(password,data[0].password);
                if(isValid){
                    return postgres
                        .select('*')
                        .from('dms_user')
                        .where('email','=',email)
                        .then(user =>{
                            res.json(user[0])
                        })
                        .catch(error => res.status("400").json("technical issue while returning user details"))
                }else{
                    console.log("no user found")
                    res.status("400").json("wrong credentials")
                }
            }else{
                console.log("no user found")
                res.status("400").json("wrong credentials")
            }
            
        })
        .catch(error => {
            console.log(error)
            res.status("400").json("technical issue while signing in")
        })
    
}

module.exports = {
    handleSignin
}