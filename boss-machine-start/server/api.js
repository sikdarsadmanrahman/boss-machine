const express = require('express');
const apiRouter = express.Router();
const checkMillionDollarIdea = require('./checkMillionDollarIdea');
const { 
    getAllFromDatabase, 
    addToDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    createMeeting,
    deleteAllFromDatabase
} = require('./db');

// .param() for workId
apiRouter.param('workId', (req, res, next, workId) => {
    const work = getFromDatabaseById('work', workId);
    if(!work) {
        return res.status(404).send();
    }
    req.work = work;
    next();
})

// .param() for minionId
apiRouter.param('minionId', (req, res, next, minionId) => {
    const minionData = getFromDatabaseById('minions', minionId);
    if(!minionData) {
        return res.status(404).send();
    } else {
        req.minionData = minionData;
        
    }
    next();
});

// .param() for ideaId
apiRouter.param('ideaId', (req, res, next, ideaId) => {
    const idea = getFromDatabaseById('ideas', ideaId);
    if(!idea) {
        return res.status(404).send();
    }
    req.idea = idea;
    next();
});

// minions route
apiRouter.get('/minions', (req, res, next) => {
    const allMinions = getAllFromDatabase('minions');
    res.status(200).send(allMinions);
});

apiRouter.post('/minions', (req, res, next) => {
    const newMinion = req.body;
    const postNewMinion = addToDatabase('minions', newMinion);
    res.status(201).send(postNewMinion);
});

apiRouter.get('/minions/:minionId', (req, res, next) => {

    res.send(req.minionData);
});

apiRouter.put('/minions/:minionId', (req, res, next) => {
    const newMinion = req.body;
    newMinion.id = req.params.minionId;
    const updatedMinion = updateInstanceInDatabase('minions', newMinion);
    res.send(updatedMinion);
});

apiRouter.delete('/minions/:minionId', (req, res, next) => {
    const minionId = req.params.minionId;
    deleteFromDatabasebyId('minions', minionId);
    res.status(204).send();
});

// minionsId/work route
apiRouter.get('/minions/:minionId/work', (req, res) => {
    const minionId = req.params.minionId;
    const allWork = getAllFromDatabase('work');
    const minionWork = allWork.filter(work => work.minionId === minionId);
    res.send(minionWork);
});

apiRouter.post('/minions/:minionId/work', (req, res) => {
    const minionId = req.params.minionId;
    const newWork = req.body;
    newWork.minionId = minionId;
    const inserted = addToDatabase('work', newWork);
    res.status(201).send(inserted);
});

apiRouter.put('/minions/:minionId/work/:workId', (req, res) => {
    const minionId = req.params.minionId;
    const workId = req.params.workId;

    //validate work belongs to minion
    if(minionId !== req.work.minionId) {
        return res.status(400).send('Work does not belong to this minion');
    }

    const newWork = req.body;
    newWork.id = workId;
    newWork.minionId = minionId;

    const updatedWork = updateInstanceInDatabase('work', newWork);
    res.status(200).send(updatedWork);
    
});

apiRouter.delete('/minions/:minionId/work/:workId', (req, res, next) => {
    const minionId = req.params.minionId;
    
    // validate work belongs to minion
    if(req.work.minionId !== minionId) {
        return res.status(400).send('Work does not belong to this minion');
    } 

    deleteFromDatabasebyId('work', req.params.workId);
    res.status(204).send();
});

// ideas route
apiRouter.get('/ideas', (req, res, next) => {
    const allIdeas = getAllFromDatabase('ideas');
    if(!allIdeas) {
        res.status(404).send('Not Found!');
    } else {
        res.status(200).send(allIdeas);
    }
});

apiRouter.post('/ideas', checkMillionDollarIdea, (req, res, next) => {
    const newIdea = req.body;
    const addIdea = addToDatabase('ideas', newIdea);
    if(!addIdea) {
        res.status(400).send();
    } else {
        res.status(201).send(addIdea);
    }
});

apiRouter.get('/ideas/:ideaId', (req, res, next) => {
    res.status(200).send(req.idea);
});

apiRouter.put('/ideas/:ideaId', checkMillionDollarIdea, (req, res, next) => {
    const ideaId = req.params.ideaId;
    const idea = req.body;
    idea.id = ideaId;
    const updatedIdea = updateInstanceInDatabase('ideas', idea);

    if(!updatedIdea) {
        res.status(404).send();
    } else {
        res.status(200).send(updatedIdea);
    }
});

apiRouter.delete('/ideas/:ideaId', (req, res, next) => {
    const ideaId = req.params.ideaId;
    const deleted = deleteFromDatabasebyId('ideas', ideaId);
    if(!deleted) {
        res.status(404).send();
    } else {
        res.status(204).send();
    }
});

// /meetings route
apiRouter.get('/meetings', (req, res, next) => {
    const allMeetings = getAllFromDatabase('meetings');
    if(!allMeetings) {
        res.status(404).send();
    } else {
        res.send(allMeetings);
    }
});

apiRouter.post('/meetings', (req, res, next) => {
    const newMeeting = createMeeting();
    const addedMeeting = addToDatabase('meetings', newMeeting);
    if(!addedMeeting) {
        res.status(400).send();
    } else {
        res.status(201).send(addedMeeting);
    }
});

apiRouter.delete('/meetings', (req, res, next) => {
    const deleted = deleteAllFromDatabase('meetings');
    if(!deleted) {
        res.status(400).send();
    } else {
        res.status(204).send(deleted);
    }
});

module.exports = apiRouter;
