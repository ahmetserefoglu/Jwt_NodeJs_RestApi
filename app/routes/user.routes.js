const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
module.exports = function(app) {
 var router = require("express").Router();

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
  app.get("/api/users/roles", [authJwt.verifyToken],controller.roleFindAll);

  app.get("/api/users", [authJwt.verifyToken,authJwt.isUserOrAdmin],controller.findAll);
  
  router.post("/",[authJwt.verifyToken, authJwt.isAdmin], controller.create);

  router.get("/:id",[authJwt.verifyToken, authJwt.isAdmin], controller.findOne);

  router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.update);
  
  router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin],controller.delete);


  app.use('/api/users', router);
};