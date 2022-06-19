const nlp = require('./class/nlp');
const manualPath = './class/training_mats/corpusModified';
const fs = require('fs');

( async () => {

  const NLP = new nlp();

  await NLP.train(manualPath);
  console.log("PARSE");
  const result = await NLP.processPDF('./uploads/Resume.pdf');
  console.log("PARSE Finish");
  let finalResult = [];
  for(let i = 0; i < result.length; i++){
    if(result[i].entities && result[i].entities.length) {
      result[i].entities.forEach((utterance) => {
        finalResult.push({
          utteranceText: utterance.utteranceText,
          accuracy: utterance.accuracy,
          entity: utterance.entity,
        });
      });
    }
  }
  console.log(finalResult);
  fs.writeFileSync('./class/training_mats/trialrun2', JSON.stringify(finalResult, null, 4), 'utf-8');
})();