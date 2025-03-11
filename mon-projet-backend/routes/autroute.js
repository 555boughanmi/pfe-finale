const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


router.post('/registerinsc', authController.registerinsc);
router.get('/listinsc', authController.listinsc);
router.delete('/deleteinsc/:id', authController.deleteinsc);


router.put('/updateAdmin/:id', authController.updateAdmin);
router.post('/loginadministrateur', authController.loginAdmin);
router.post('/registerfsi', authController.registerFSI);



router.put('/accepter/:id', authController.accepter);
router.post('/registerAdmin', authController.registerAdmin);


router.put('/updatefsi/:id', authController.updateFSI);
router.delete('/deletefsi/:id', authController.deleteFSI);
router.get('/listfsi', authController.listFSI);
//**router.post('/loginfsi', authController.loginFSI);

//**router.get('/listCrm/:idf', authController.listCrm);


module.exports = router;
