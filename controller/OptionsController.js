const Option=require('../models/options');
const Question= require('../models/questions');
module.exports.create=async function(req,res){
    // in this section we will create the options
    console.log(req.body,req.params.id)
    const opt=await Option.create({
        option:req.body.content,
        question:req.params.id,
        // 
    })
    // it is for adding the vote to option of the id
    const updateOpt=await Option.findByIdAndUpdate(opt._id,{"add_vote":`http://localhost:3000/api/v1/options/${opt._id}/add_vote`})
    updateOpt.save()
    // now search the question so that we can append the option in question-->option array
    const ques=await Question.findById(req.params.id);
    if(ques){
    ques.options.push(updateOpt)
    ques.save()
    console.log(ques)
    res.send(ques) 
    }
    else{
        res.send('question does not exists')
    }
}

module.exports.add_vote=async function(req,res){
    // in this votes will be added to the particular option of the question
    console.log(req.params.id)
    // this the increment query in which the vote is incremented by one 
    const opt=await Option.findByIdAndUpdate(req.params.id,{ $inc: { vote: 1 }})
    if(opt){
        await opt.save();
        console.log(opt);
        res.send(opt)
    }
    // handling the bad requests
    else{
        res.send('option does not exits')
    }
}

module.exports.delete=async function(req,res){
    // delete the id option 
    console.log('id',req.params.id);
    const opt=await Option.findById(req.params.id);
    if(opt){
        const quesId=opt.question;
        // finding the question on which the option is to be deleted and removing that option from the option array
        const ques=await Question.findByIdAndUpdate(quesId,{$pull:{options:req.params.id}});
        // now absolutely deleting that option
        await Option.findByIdAndDelete(req.params.id)
        console.log(ques);
        res.send('option deleted')
    }
    // handling the bad request
    else{
        res.send('id not exists')
    }
}
