const adminAuth  = (req,res,next)=>{
   console.log("admin auth is getting checked");
   const token = "xyzhjhjhjh";
   const isAdminauthorized = (token === "yzhjhjhjh");

   if(isAdminauthorized) {
     next();
   }else {
     res.status(401).send("Unauthorized req");
   }
}

module.exports = {adminAuth};