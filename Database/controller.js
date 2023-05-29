import Users from "@/Model/UserSchema";

/** Controller **/

// GET: http://localhost:3000/api/users
export async function getUsers(req,res){
    try {
        // Get all the users
        const users = await Users.find({});

        // Check if no user return 404.
        if(!users) res.status(404).json({ error: 'NO DATA FOUND' });

        res.status(200).json({ users : users });
    } catch (error) {
        res.status(404).json({error:"ERROR GETTING USERS"})
    }
}

export async function getUser(req, res){
    try {
        const {userId} = req.query;
        if(userId){
            const user = await Users.findById(userId);
            return res.status(200).json({user}) 
        }
    } catch (error) {
        return res.status(200).json({error: 'Error finding user with given ID...'})
    }
}

// POST: http://localhost:3000/api/users
export async function postUser(req,res){
    try {
        const formData = req.body;

        if(!formData) return res.status(404).json({error : 'No Form Data Provided..'});
        Users.create(formData)
        .then((result)=>{
            //console.log(result)
            return res.status(200).json({result})
        })
        .catch((err)=>{
            return res.status(404).json({err})
        })
    } catch (error) {
        return res.status(404).json({error})
    }
}

// PUT: http://localhost:3000/api/users/1
export async function putUser(req,res){
    try {
        const {userId} = req.query;
        const formData = req.body;

        if(userId && formData){
            const user = await Users.findByIdAndUpdate(userId, formData);
            res.status(200).json(user)
        }
        res.status(404).json({message: 'Error updating user..'})
    } catch (error) {
        return res.status(404).json({error : 'Error updating data..'})
    }
}

// DELETE: http://localhost:3000/api/users/1
export async function deleteUser(req, res){
    try {
        const {userId} = req.query;
        if(userId){
           const user =  await Users.findByIdAndDelete(userId);
           return res.status(200).json({deletedId: userId, user: user});
        }
    } catch (error) {
         return res.status(404).json({error: 'Error deleting data for user...'})       
    }
}