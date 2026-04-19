const express = require("express");
const router = express.Router();
const {ProgramMaster} = require("./Model");
const mongoose = require("mongoose"); 

router.post('/AddProgram', async function (req, res) {
  const entity = req.body;
  const session = await mongoose.startSession();
  session.startTransaction();

  try {

    const existing = await ProgramMaster.findOne({ Title: entity.Title }).session(session);

    if (existing) {
      await session.abortTransaction();
      session.endSession();

      return res.send({
        Boolval: false,
        message: "Program already exists"
      });
    }

    await ProgramMaster.create([entity], { session });

    await session.commitTransaction();
    session.endSession();

    return res.send({
      Boolval: true,
      message: "Program created successfully"
    });

  } catch (err) {

    await session.abortTransaction();
    session.endSession();

    return res.send({
      Boolval: false,
      returnerror: err.message
    });
  }
});


router.get('/GetPrograms', async function (req, res) {

  try {

    const data = await ProgramMaster.find().sort({ createdAt: -1 });

    return res.send({
      Boolval: true,
      data: data
    });

  } catch (err) {

    return res.send({
      Boolval: false,
      returnerror: err.message
    });
  }

});


router.put('/UpdateProgram/:id', async function (req, res) {

  const session = await mongoose.startSession();
  session.startTransaction();

  try {

    await ProgramMaster.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, session }
    );

    await session.commitTransaction();
    session.endSession();

    return res.send({
      Boolval: true,
      message: "Program updated successfully"
    });

  } catch (err) {

    await session.abortTransaction();
    session.endSession();

    return res.send({
      Boolval: false,
      returnerror: err.message
    });

  }

});


router.delete('/DeleteProgram/:id', async function (req, res) {

  const session = await mongoose.startSession();
  session.startTransaction();

  try {

    await ProgramMaster.findByIdAndDelete(req.params.id).session(session);

    await session.commitTransaction();
    session.endSession();

    return res.send({
      Boolval: true,
      message: "Program deleted successfully"
    });

  } catch (err) {

    await session.abortTransaction();
    session.endSession();

    return res.send({
      Boolval: false,
      returnerror: err.message
    });

  }

});


router.get('/GetProgramById/:id', async function (req, res) {

  try {

    const id = req.params.id;

    const data = await ProgramMaster.findById(id);

    if (!data) {
      return res.send({
        Boolval: false,
        message: "Program not found"
      });
    }

    return res.send({
      Boolval: true,
      data: data
    });

  } catch (err) {

    return res.send({
      Boolval: false,
      returnerror: err.message
    });

  }

});



module.exports = router;