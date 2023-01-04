const db = require('../db/db.js');
const express = require('express');
const router = express.Router();

router.get('/cards/nextCard/:id', async (req, res, next) => {
  try {

    console.log('just checking')

    const _id = req.params.id;
    const row = await db.readAllCards();
    const ids = row.map(element => {
      return element._id; 
    })

    console.log('ids', ids)

    let idx = ids.findIndex((element) => {
      return element === Number(_id);  
    }); 

    console.log('idx', idx)

    const newIdx = (idx + 1) % ids.length; 

    console.log('newIdx', newIdx)

    res.status(200).json(row[newIdx]._id);
  } catch (err) {
    next({
      log: 'error getting cards',
      status: 500,
      message: { err: err },
    });
  }
})

router.get('/cards/:id', async (req, res, next) => {
  try {
    const _id = req.params.id;
    const row = await db.readCard(_id);
    // no card found
    if (row === undefined) throw `no card with id=${_id} found`;
    res.status(200).json(row);
  } catch (err) {
    next({
      log: 'error getting single card',
      status: 500,
      message: { err: err },
    });
  }
});

router.get('/cards', async (req, res, next) => {
  try {
    const row = await db.readAllCards();
    res.status(200).json(row);
  } catch (err) {
    next({
      log: 'error getting cards',
      status: 500,
      message: { err: err },
    });
  }
});

router.post('/cards', async (req, res, next) => {
  try {
    // sanitize post data
    const { title, front, back, difficulty, hints, scheduled } =
      req.body;
    const data = {
      title,
      front,
      back,
      difficulty,
      hints,
      scheduled,
    };

    console.log('creating data: ', data);
    const row = await db.createCard(data);
    res.status(200).json(row);
  } catch (err) {
    next({
      log: 'error creating card',
      status: 500,
      message: { err: err },
    });
  }
});

router.put('/cards/:id', async (req, res, next) => {
  try {

    const { _id, title, front, back, difficulty, hints, scheduled } = req.body; 
    const data = { _id, title, front, back, difficulty, hints, scheduled }; 
    
    const row = await db.updateCard(data); 
    res.status(200).json(row); 
    console.log('updated sucessfully') 
    return next(); 

  } catch(err) {
    next({
      log: 'error updating the card', 
      status: 500, 
      message: { err: err }, 
    }); 
  }
})

router.delete('/cards/:id', async (req, res, next) => {
  try {

    const _id = req.params.id; 
    const row = await db.deleteCard(_id); 
    if(row === undefined) throw `no card with id=${_id} was not found`; 
    res.status(200).json(row);  
    console.log('deleted sucessfully') 
    return next(); 

  } catch(err) {
    next({
      log: 'error deleting the card', 
      status: 500, 
      message: { err: err }, 
    }); 
  }
})

module.exports = router;
