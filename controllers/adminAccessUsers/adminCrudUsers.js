const {user} = require('../../models/seeders/seeders')


const adminGetUsers = async (req,res)=>{

    try
    {
        const allUsers = await user.findAll()
        return res.status(200).json({allUsers})
    }

    catch(err){

        res.status(500).json({error:"Failed to get the user"})
    }
}


const adminGetUsersById = async (req,res)=>{
    try
    {
        const id = parseInt(req.params.id)
        if(!id)
        {
            res.status(404).json({error:"parameters of an id not found"})
        }
        const userById = await user.findByPk(id)
        return res.status(200).json(userById)
    }
    catch(err){
        res.status(500).json({error:"Failed to get the user by id"})
    }


}

const adminUpdateUsers = async (req,res)=>{

    try
    {
        const id = parseInt(req.params.id)
        const body = req.body;
        if(!id)
        {
            res.status(404).json({error:"parameters of an id defined"})
        }

        const patchUser = await user.update(body ,
            {
                where : {id}
            })
        return res.status(200).json(patchUser)
    }
    catch(err){
        res.status(500).json({error:"Failed to update user"})
    }
}

const adminDeleteUser = async (req,res)=>{

    try
    {
        const id = parseInt(req.params.id)
        if(!id)
        {
            res.status(404).json({error:"parameters of an id not found"})
        }
        await user.destroy({where:{id}})
        return res.status(200).json({success:"User deleted"})

    }
    catch(err){
        res.status(400).json({error:"Failed to delete user"})
    }
}
module.exports = {adminGetUsers , adminGetUsersById , adminUpdateUsers , adminDeleteUser};