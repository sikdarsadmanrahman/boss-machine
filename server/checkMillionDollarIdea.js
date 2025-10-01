const checkMillionDollarIdea = (req, res, next) => {
    const idea = req.body;
    const totalValue = idea.numWeeks* idea.weeklyRevenue;
    if(totalValue >= 1000000) {
        next();
    } else {
        res.status(400).send('Idea must be worth at least $1,000,000!');
    }
};
    
// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
