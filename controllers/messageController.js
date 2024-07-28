

export const sendMessage=async(req,res)=>{
    try{
        const senderId=req.params.id;
        const {message} =req.body;
        
        res.status(200).json({message:"Successfully sent the message"});
    }
    catch(err)
    {
        res.status(500).json({error:"Internal Server Error"})
    }
}