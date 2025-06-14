import jwt from 'jsonwebtoken'

const authUser= async (req,res,next)=>{
    const {token} = req.headers;

    if(! token){
        res.json({success:false,message:"Not Authorized Login Agian"})
    }
    try {
        const token_decode= jwt.verify(token,process.env.jwtSecret)
        req.body.userId= token_decode.id
        next()
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export default authUser