import UserModel from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// Register
export const registerUser = async (req, res) => {
   

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password=hashedPass;
  const newUser = new UserModel(req.body);
  const {username} = req.body
  try {
    const olduser=await UserModel.findOne({username});
    if(olduser){
      return res.status(400).json({message:"User already exists"});
    }
    const user=await newUser.save();
    const token=jwt.sign({
      username:user.username,id:user._id }, process.env.JWT_KEY ,{expiresIn:'5h'})
    res.status(200).json({user,token});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// login

export const loginUser = async (req, res) => {
    const {username, password} = req.body

    try {
        const user = await UserModel.findOne({username: username})


        if(user)
        {
            const validity = await bcrypt.compare(password, user.password)
            if(!validity){
              res.status(400).json("Wrong Password");
            }else{
               const token=jwt.sign({
                username:user.username,id:user._id }, process.env.JWT_KEY ,{expiresIn:'5h'});
              res.status(200).json({user,token});
            }

          
        }
        else{
            res.status(404).json("User does not exists")
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}