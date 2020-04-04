// Lambda Function code for Alexa.
// Paste this into your index.js file. 

const Alexa = require("ask-sdk");
const constants = require('./constants');


const invocationName = "carnaatak music";


const LauchPuja  = ["Sarasvati Namastubhyam Varade Kaama-Ruupinni Vidya arambham Karissyaami Siddhir-Bhavatu Me Sadaa", "Vakratunda Maha-Kaaya Surya-Kotti Samaprabha Nirvighnam Kuru Me Deva Sarva-Kaaryeshu Sarvadaa", "Guru Brahma Gurur Vishnu Guru Devo Maheshwaraha Guru Saakshat Para Brahma Tasmai Sree Gurave Namaha"];

// Session Attributes 
//   Alexa will track attributes for you, by default only during the lifespan of your session.
//   The history[] array will track previous request(s), used for contextual Help/Yes/No handling.
//   Set up DynamoDB persistence to have the skill save and reload these attributes between skill sessions.
// 1. Intent Handlers =============================================

const AMAZON_FallbackIntent_Handler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
     
        return responseBuilder
            .speak('Sorry I didnt catch what you said, Please say Index to start')
            .reprompt(stripSpeak('Sorry I didnt catch what you said, Please say Index to start'))
            .getResponse();
    },
};

const AMAZON_CancelIntent_Handler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && (request.intent.name === 'AMAZON.CancelIntent' || request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();


        let say = 'Okay, see you in the next session! <break time= "0.5s"/> If you love this skill leave your rating and comments in the Alexa store.';

        return responseBuilder
            .speak(say)
            .withShouldEndSession(true)
            .getResponse();
    },
};

const AMAZON_HelpIntent_Handler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

       

        let say = 'This skill will help you to learn the basics of Carnaatak music. Please say Index to know the sequence of lesson';

        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .getResponse();
    },
};

const AMAZON_NavigateHomeIntent_Handler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.NavigateHomeIntent';
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        let say = 'Hello Please say Index to start';


        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .getResponse();
    },
};

const SaraliSwarasIntent_Handler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'SaraliSwarasIntent';
    },
    async handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
		const playbackInfo = await getPlaybackInfo(handlerInput);

        // delegate to Alexa to collect all the required slots 
        const currentIntent = request.intent;
        if (request.dialogState && request.dialogState !== 'COMPLETED') {
            return handlerInput.responseBuilder
                .addDelegateDirective(currentIntent)
                .getResponse();

        }
        let say = '';

        let slotStatus = '';
        let resolvedSlot;

        let slotValues = getSlotValues(request.intent.slots);
        // getSlotValues returns .heardAs, .resolved, and .isValidated for each slot, according to request slot status codes ER_SUCCESS_MATCH, ER_SUCCESS_NO_MATCH, or traditional simple request slot without resolutions

        // console.log('***** slotValues: ' +  JSON.stringify(slotValues, null, 2));
        //   SLOT: sarali_swarasSlot 
        if (slotValues.sarali_swarasSlot.heardAs) {
            slotStatus += ' slot sarali_swarasSlot was heard as ' + slotValues.sarali_swarasSlot.heardAs + '. ';
        }
        else {
            slotStatus += 'slot sarali_swarasSlot is empty. ';
        }
        if (slotValues.sarali_swarasSlot.ERstatus === 'ER_SUCCESS_MATCH') {
            slotStatus += 'a valid ';
            if (slotValues.sarali_swarasSlot.resolved !== slotValues.sarali_swarasSlot.heardAs) {
                slotStatus += 'synonym for ' + slotValues.sarali_swarasSlot.resolved + '. ';
            }
            else {
                slotStatus += 'match. '
            } // else {
            //
        }
        if (slotValues.sarali_swarasSlot.ERstatus === 'ER_SUCCESS_NO_MATCH') {
            slotStatus += 'which did not match any slot value. ';
            console.log('***** consider adding "' + slotValues.sarali_swarasSlot.heardAs + '" to the custom slot type used by slot sarali_swarasSlot! ');
        }

       
        //   SLOT: sarali_swaraspeedSlot 
        if (slotValues.sarali_swaraspeedSlot.heardAs) {
            slotStatus += ' slot sarali_swaraspeedSlot was heard as ' + slotValues.sarali_swaraspeedSlot.heardAs + '. ';
        }
        else {
            slotStatus += 'slot sarali_swaraspeedSlot is empty. ';
        }
        if (slotValues.sarali_swaraspeedSlot.ERstatus === 'ER_SUCCESS_MATCH') {
            slotStatus += 'a valid ';
            if (slotValues.sarali_swaraspeedSlot.resolved !== slotValues.sarali_swaraspeedSlot.heardAs) {
                slotStatus += 'synonym for ' + slotValues.sarali_swaraspeedSlot.resolved + '. ';
            }
            else {
                slotStatus += 'match. '
            } // else {
            //
        }
        if (slotValues.sarali_swaraspeedSlot.ERstatus === 'ER_SUCCESS_NO_MATCH') {
            slotStatus += 'which did not match any slot value. ';
            console.log('***** consider adding "' + slotValues.sarali_swaraspeedSlot.heardAs + '" to the custom slot type used by slot sarali_swaraspeedSlot! ');
        }

        

        var voiceId = 'ss' + '-' + slotValues.sarali_swarasSlot.heardAs + '-' + slotValues.sarali_swaraspeedSlot.heardAs;
        var rta = constants.saraliSwarasAudioData.filter(it => it.id === voiceId);

        playbackInfo.Id = voiceId;
        playbackInfo.currentSelection = rta;
        playbackInfo.currentSwara = slotValues.sarali_swarasSlot.heardAs;
        playbackInfo.currentSwaratype = "Sarali Swaras";
        playbackInfo.currentSwaraSpeed = slotValues.sarali_swaraspeedSlot.heardAs;
		playbackInfo.hasPreviousPlaybackSession = true;
		playbackInfo.AudioArrayLen = constants.saraliSwarasAudioData.length;
		
		if(rta[0].url === 'empty'){
		    say += 'Sorry ' + rta[0].title + ' lesson not available. We will upload soon. You can say repeat or for Next swaram say Next';
		} else{
		    say += rta[0].title + ' <audio src="' + rta[0].url + '"/> Good. You can say repeat or for Next swaram say Next';
		}

        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + 'You want to repeat say repeat or for next swaram say Next')
            .getResponse();
    },
};
const DaatuSwaraIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'DaatuSwaraIntent' ;
    },
    async handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        const playbackInfo = await getPlaybackInfo(handlerInput);
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        // delegate to Alexa to collect all the required slots 
        const currentIntent = request.intent; 
        if (request.dialogState && request.dialogState !== 'COMPLETED') { 
            return handlerInput.responseBuilder
                .addDelegateDirective(currentIntent)
                .getResponse();

        } 
        let say = 'Hello from DaatuSwaraIntent. ';

        let slotStatus = '';
        let resolvedSlot;

        let slotValues = getSlotValues(request.intent.slots); 
        // getSlotValues returns .heardAs, .resolved, and .isValidated for each slot, according to request slot status codes ER_SUCCESS_MATCH, ER_SUCCESS_NO_MATCH, or traditional simple request slot without resolutions

        // console.log('***** slotValues: ' +  JSON.stringify(slotValues, null, 2));
        //   SLOT: Daatu_swaraslot 
        if (slotValues.Daatu_swaraslot.heardAs) {
            slotStatus += ' slot Daatu_swaraslot was heard as ' + slotValues.Daatu_swaraslot.heardAs + '. ';
        } else {
            slotStatus += 'slot Daatu_swaraslot is empty. ';
        }
        if (slotValues.Daatu_swaraslot.ERstatus === 'ER_SUCCESS_MATCH') {
            slotStatus += 'a valid ';
            if(slotValues.Daatu_swaraslot.resolved !== slotValues.Daatu_swaraslot.heardAs) {
                slotStatus += 'synonym for ' + slotValues.Daatu_swaraslot.resolved + '. '; 
                } else {
                slotStatus += 'match. '
            } // else {
                //
        }
        if (slotValues.Daatu_swaraslot.ERstatus === 'ER_SUCCESS_NO_MATCH') {
            slotStatus += 'which did not match any slot value. ';
            console.log('***** consider adding "' + slotValues.Daatu_swaraslot.heardAs + '" to the custom slot type used by slot Daatu_swaraslot! '); 
        }

        
        //   SLOT: Daatu_swaraspeedslot 
        if (slotValues.Daatu_swaraspeedslot.heardAs) {
            slotStatus += ' slot Daatu_swaraspeedslot was heard as ' + slotValues.Daatu_swaraspeedslot.heardAs + '. ';
        } else {
            slotStatus += 'slot Daatu_swaraspeedslot is empty. ';
        }
        if (slotValues.Daatu_swaraspeedslot.ERstatus === 'ER_SUCCESS_MATCH') {
            slotStatus += 'a valid ';
            if(slotValues.Daatu_swaraspeedslot.resolved !== slotValues.Daatu_swaraspeedslot.heardAs) {
                slotStatus += 'synonym for ' + slotValues.Daatu_swaraspeedslot.resolved + '. '; 
                } else {
                slotStatus += 'match. '
            } // else {
                //
        }
        if (slotValues.Daatu_swaraspeedslot.ERstatus === 'ER_SUCCESS_NO_MATCH') {
            slotStatus += 'which did not match any slot value. ';
            console.log('***** consider adding "' + slotValues.Daatu_swaraspeedslot.heardAs + '" to the custom slot type used by slot Daatu_swaraspeedslot! '); 
        }

        
        
        var voiceId = 'ds' + '-' + slotValues.Daatu_swaraslot.heardAs + '-' + slotValues.Daatu_swaraspeedslot.heardAs;
        var rta = constants.saraliSwarasAudioData.filter(it => it.id === voiceId);

        playbackInfo.Id = voiceId;
        playbackInfo.currentSelection = rta;
        playbackInfo.currentSwara = slotValues.Daatu_swaraslot.heardAs;
        playbackInfo.currentSwaratype = "Sarali Swaras";
        playbackInfo.currentSwaraSpeed = slotValues.Daatu_swaraspeedslot.heardAs;
		playbackInfo.hasPreviousPlaybackSession = true;
		playbackInfo.AudioArrayLen = constants.saraliSwarasAudioData.length;
		
		if(rta[0].url === 'empty'){
		    say += 'Sorry ' + rta[0].title + ' lesson not available. We will upload soon. You can say repeat or for Next swaram say Next';
		} else{
		    say += rta[0].title + ' <audio src="' + rta[0].url + '"/> Good. You can say repeat or for Next swaram say Next';
		}


        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + 'You want to repeat say repeat or for next swaram say Next')
            .getResponse();
    },
};
const JantaSwaraIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'JantaSwaraIntent' ;
    },
    async handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        const playbackInfo = await getPlaybackInfo(handlerInput);
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        let say = 'Hello from JantaSwaraIntent. ';

        let slotStatus = '';
        let resolvedSlot;

        let slotValues = getSlotValues(request.intent.slots); 
        // getSlotValues returns .heardAs, .resolved, and .isValidated for each slot, according to request slot status codes ER_SUCCESS_MATCH, ER_SUCCESS_NO_MATCH, or traditional simple request slot without resolutions

        // console.log('***** slotValues: ' +  JSON.stringify(slotValues, null, 2));
        //   SLOT: Janta_swaraslot 
        if (slotValues.Janta_swaraslot.heardAs) {
            slotStatus += ' slot Janta_swaraslot was heard as ' + slotValues.Janta_swaraslot.heardAs + '. ';
        } else {
            slotStatus += 'slot Janta_swaraslot is empty. ';
        }
        if (slotValues.Janta_swaraslot.ERstatus === 'ER_SUCCESS_MATCH') {
            slotStatus += 'a valid ';
            if(slotValues.Janta_swaraslot.resolved !== slotValues.Janta_swaraslot.heardAs) {
                slotStatus += 'synonym for ' + slotValues.Janta_swaraslot.resolved + '. '; 
                } else {
                slotStatus += 'match. '
            } // else {
                //
        }
        if (slotValues.Janta_swaraslot.ERstatus === 'ER_SUCCESS_NO_MATCH') {
            slotStatus += 'which did not match any slot value. ';
            console.log('***** consider adding "' + slotValues.Janta_swaraslot.heardAs + '" to the custom slot type used by slot Janta_swaraslot! '); 
        }

       
        //   SLOT: janta_swaraspeedslot 
        if (slotValues.janta_swaraspeedslot.heardAs) {
            slotStatus += ' slot janta_swaraspeedslot was heard as ' + slotValues.janta_swaraspeedslot.heardAs + '. ';
        } else {
            slotStatus += 'slot janta_swaraspeedslot is empty. ';
        }
        if (slotValues.janta_swaraspeedslot.ERstatus === 'ER_SUCCESS_MATCH') {
            slotStatus += 'a valid ';
            if(slotValues.janta_swaraspeedslot.resolved !== slotValues.janta_swaraspeedslot.heardAs) {
                slotStatus += 'synonym for ' + slotValues.janta_swaraspeedslot.resolved + '. '; 
                } else {
                slotStatus += 'match. '
            } // else {
                //
        }
        if (slotValues.janta_swaraspeedslot.ERstatus === 'ER_SUCCESS_NO_MATCH') {
            slotStatus += 'which did not match any slot value. ';
            console.log('***** consider adding "' + slotValues.janta_swaraspeedslot.heardAs + '" to the custom slot type used by slot janta_swaraspeedslot! '); 
        }

       
        var voiceId = 'js' + '-' + slotValues.Janta_swaraslot.heardAs + '-' + slotValues.janta_swaraspeedslot.heardAs;
        var rta = constants.saraliSwarasAudioData.filter(it => it.id === voiceId);
        
        playbackInfo.Id = voiceId;
        playbackInfo.currentSelection = rta;
        playbackInfo.currentSwara = slotValues.Janta_swaraslot.heardAs;
        playbackInfo.currentSwaratype = "Sarali Swaras";
        playbackInfo.currentSwaraSpeed = slotValues.janta_swaraspeedslot.heardAs;
		playbackInfo.hasPreviousPlaybackSession = true;
		playbackInfo.AudioArrayLen = constants.saraliSwarasAudioData.length;
		
		if(rta[0].url === 'empty'){
		    say += 'Sorry ' + rta[0].title + ' lesson not available. We will upload soon. You can say repeat or for Next swaram say Next';
		} else{
		    say += rta[0].title + ' <audio src="' + rta[0].url + '"/> Good. You can say repeat or for Next swaram say Next';
		}


        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .getResponse();

    },
};

const IndexIntent_Handler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'IndexIntent';
    },
    handle(handlerInput) {
        
        const responseBuilder = handlerInput.responseBuilder;
        let say = '';

        say += 'Table of content <break time="0.5s"/>';
		say += 'Lesson one <break time="0.5s"/> Sarali Swaras <break time="0.5s"/>';
		say += 'Lesson two <break time="0.5s"/> Daatu Swaras <break time="0.5s"/>';
		say += 'Lesson three <break time="0.5s"/> Janta Swaras <break time="0.5s"/>';
		say += 'which one you want to start. You can say Sarali Swaras or Daatu Swaras et cetera';


        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .getResponse();
    },
};

const  AMAZON_PreviousIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.PreviousIntent' ;
    },
    async handle(handlerInput) {
       
        const responseBuilder = handlerInput.responseBuilder;
		const playbackInfo = await getPlaybackInfo(handlerInput);
      
        let say = '';
        let rta  = playbackInfo.currentSelection;
		let voiceInd = rta[0].index;
		voiceInd = voiceInd - 1;

		
		if(voiceInd >= 0)
		{		
	        let newrta = constants.saraliSwarasAudioData.filter(it => it.index === voiceInd);
			playbackInfo.currentSelection = newrta;
			if(newrta[0].url === 'empty'){
		        say += 'Sorry ' + newrta[0].title + ' lesson not available. We will upload soon. You can say repeat or for Next swaram say Next';
    		} else {
    		    say += newrta[0].title + ' <audio src="' + newrta[0].url + '"/> Good. You can say Previous <break time="0.5s"/> repeat <break time="0.5s"/> next <break time="0.5s"/> index  <break time="0.5s"/> stop';
    		}
			
		} else{
			say += 'Well Done. You successfully completed the Carnaatak music. You can say Previous <break time="0.5s"/> repeat <break time="0.5s"/> next <break time="0.5s"/> index  <break time="0.5s"/> stop';
		}

        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + 'You can say Previous <break time="0.5s"/> repeat <break time="0.5s"/> next <break time="0.5s"/> index  <break time="0.5s"/> stop')
            .getResponse();

      
    },
};
  
const AMAZON_NextIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.NextIntent' ;
    },
    async handle(handlerInput) {
        
        const responseBuilder = handlerInput.responseBuilder;
		const playbackInfo = await getPlaybackInfo(handlerInput);
        

        let say = '';
		
		
        let rta  = playbackInfo.currentSelection;
		let voiceInd = rta[0].index;
		voiceInd = voiceInd + 1;
		let mp3length = playbackInfo.AudioArrayLen -1;

		
		if(voiceInd < mp3length)
		{		
	        let newrta = constants.saraliSwarasAudioData.filter(it => it.index === voiceInd);
			playbackInfo.currentSelection = newrta;
			
			if(newrta[0].url === 'empty'){
		        say += 'Sorry ' + newrta[0].title + ' lesson not available. We will upload soon. You can say repeat or for Next swaram say Next';
    		} else {
    		    say += newrta[0].title + ' <audio src="' + newrta[0].url + '"/> Good. You can say Previous <break time="0.5s"/> repeat <break time="0.5s"/> next <break time="0.5s"/> index  <break time="0.5s"/> stop';
    		}
		} else{
			say += 'Well Done. You successfully completed the Carnaatak music.You can say Previous <break time="0.5s"/> repeat <break time="0.5s"/> index  <break time="0.5s"/> stop';
		}

       return responseBuilder
            .speak(say)
            .reprompt('try again, ' + 'You can say Previous <break time="0.5s"/> repeat <break time="0.5s"/> next <break time="0.5s"/> index  <break time="0.5s"/> stop')
            .getResponse();

      
    },
};

const AMAZON_ResumeIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.ResumeIntent' ;
    },
    async handle(handlerInput) {
       
        const responseBuilder = handlerInput.responseBuilder;
		const playbackInfo = await getPlaybackInfo(handlerInput);
       
	
		let rta  = playbackInfo.currentSelection;
		 
        let say = rta[0].title + ' <audio src="' + rta[0].url + '"/> Good. You can say Previous <break time="0.5s"/> repeat <break time="0.5s"/> next <break time="0.5s"/> index  <break time="0.5s"/> stop';

        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + 'You can say Previous <break time="0.5s"/> repeat <break time="0.5s"/> next <break time="0.5s"/> index  <break time="0.5s"/> stop')
            .getResponse();

       
    },
};

const LaunchRequest_Handler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'LaunchRequest';
    },
   async handle(handlerInput) {
        const responseBuilder = handlerInput.responseBuilder;
		const playbackInfo = await getPlaybackInfo(handlerInput);
		
        let skillTitle = capitalize(invocationName);
		let message, reprompt;
		
		if (!playbackInfo.hasPreviousPlaybackSession) {
		  message = '<audio src="https://carnaatak.s3.ap-south-1.amazonaws.com/vakratunda_mahakay.mp3"/> welcome to ' + invocationName + ' ! Lets start with Lession index say Index to start';
		  reprompt = 'Please select from Lesson Index 1 Sarali Swaras';
		} else {
		  playbackInfo.inPlaybackSession = false;
		  message = '<audio src="https://carnaatak.s3.ap-south-1.amazonaws.com/vakratunda_mahakay.mp3"/> You were listening to '+ playbackInfo.currentSelection[0].title +'. You can say Previous <break time="0.5s"/> repeat <break time="0.5s"/> next <break time="0.5s"/> index.';
		  reprompt = 'You can say yes to resume or no to play from the top.';
		}

        return responseBuilder
            .speak(message)
            .reprompt('try again, ' + reprompt)
            .withStandardCard('Welcome!',
                'Hello!\nThis is a card for your skill, ' + skillTitle,
                welcomeCardImg.smallImageUrl, welcomeCardImg.largeImageUrl)
            .getResponse();
    },
};

const SessionEndedHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);
        return handlerInput.responseBuilder.getResponse();
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const request = handlerInput.requestEnvelope.request;

        console.log(`Error handled: ${error.message}`);
        
        return handlerInput.responseBuilder
            .speak('Sorry, an error occurred.  Please say again.')
            .reprompt('Sorry, an error occurred.  Please say again.')
            .getResponse();
    }
};


// 2. Constants ===========================================================================

// Here you can define static data, to be used elsewhere in your code.  For example: 
//    const myString = "Hello World";
//    const myArray  = [ "orange", "grape", "strawberry" ];
//    const myObject = { "city": "Boston",  "state":"Massachusetts" };

const APP_ID = undefined; // TODO replace with your Skill ID (OPTIONAL).

// 3.  Helper Functions ===================================================================

function stripSpeak(str) {
    return (str.replace('<speak>', '').replace('</speak>', ''));
}
function capitalize(myString) {

     return myString.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); }) ;
}
function randomElement(myArray) { 
    return(myArray[Math.floor(Math.random() * myArray.length)]); 
} 
function getSlotValues(filledSlots) {
    const slotValues = {};

    Object.keys(filledSlots).forEach((item) => {
        const name = filledSlots[item].name;

        if (filledSlots[item] &&
            filledSlots[item].resolutions &&
            filledSlots[item].resolutions.resolutionsPerAuthority[0] &&
            filledSlots[item].resolutions.resolutionsPerAuthority[0].status &&
            filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {
            switch (filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {
                case 'ER_SUCCESS_MATCH':
                    slotValues[name] = {
                        heardAs: filledSlots[item].value,
                        resolved: filledSlots[item].resolutions.resolutionsPerAuthority[0].values[0].value.name,
                        ERstatus: 'ER_SUCCESS_MATCH'
                    };
                    break;
                case 'ER_SUCCESS_NO_MATCH':
                    slotValues[name] = {
                        heardAs: filledSlots[item].value,
                        resolved: '',
                        ERstatus: 'ER_SUCCESS_NO_MATCH'
                    };
                    break;
                default:
                    break;
            }
        }
        else {
            slotValues[name] = {
                heardAs: filledSlots[item].value,
                resolved: '',
                ERstatus: ''
            };
        }
    }, this);

    return slotValues;
}

function supportsDisplay(handlerInput) // returns true if the skill is running on a device with a display (Echo Show, Echo Spot, etc.) 
{ //  Enable your skill for display as shown here: https://alexa.design/enabledisplay 
    const hasDisplay =
        handlerInput.requestEnvelope.context &&
        handlerInput.requestEnvelope.context.System &&
        handlerInput.requestEnvelope.context.System.device &&
        handlerInput.requestEnvelope.context.System.device.supportedInterfaces &&
        handlerInput.requestEnvelope.context.System.device.supportedInterfaces.Display;

    return hasDisplay;
}

const welcomeCardImg = {
    smallImageUrl: "https://s3.amazonaws.com/skill-images-789/cards/card_plane720_480.png",
    largeImageUrl: "https://s3.amazonaws.com/skill-images-789/cards/card_plane1200_800.png"


};
const DisplayImg1 = {
    title: 'Jet Plane',
    url: 'https://s3.amazonaws.com/skill-images-789/display/plane340_340.png'
};
const DisplayImg2 = {
    title: 'Starry Sky',
    url: 'https://s3.amazonaws.com/skill-images-789/display/background1024_600.png'

};


/* HELPER FUNCTIONS */

async function getPlaybackInfo(handlerInput) {
  const attributes = await handlerInput.attributesManager.getPersistentAttributes();
  return attributes.playbackInfo;
}

const LoadPersistentAttributesRequestInterceptor = {
  async process(handlerInput) {
    const persistentAttributes = await handlerInput.attributesManager.getPersistentAttributes();
   // Check if user is invoking the skill the first time and initialize preset values
    if (Object.keys(persistentAttributes).length === 0) {
      handlerInput.attributesManager.setPersistentAttributes({
        playbackInfo: {
          Id: 0,
          currentSelection: '',
          currentSwara: '',
          currentSwaratype: '',
          currentSwaraSpeed: '',
          AudioArrayLen: constants.saraliSwarasAudioData.length,
          hasPreviousPlaybackSession: false,
        },
      });
    }
  },
};
const SavePersistentAttributesResponseInterceptor = {
  async process(handlerInput) {
    await handlerInput.attributesManager.savePersistentAttributes();
  },
};



// 4. Exports handler function and setup ===================================================
const skillBuilder = Alexa.SkillBuilders.standard();
exports.handler = skillBuilder
    .addRequestHandlers(
        AMAZON_FallbackIntent_Handler,
        AMAZON_CancelIntent_Handler,
        AMAZON_HelpIntent_Handler,
        AMAZON_NavigateHomeIntent_Handler,
        SaraliSwarasIntent_Handler,
        JantaSwaraIntent_Handler,
        DaatuSwaraIntent_Handler,
        IndexIntent_Handler,
        AMAZON_NextIntent_Handler, 
        AMAZON_ResumeIntent_Handler, 
        LaunchRequest_Handler,
        AMAZON_PreviousIntent_Handler,
        SessionEndedHandler
    )
  .addRequestInterceptors(LoadPersistentAttributesRequestInterceptor)
  .addResponseInterceptors(SavePersistentAttributesResponseInterceptor)
  .addErrorHandlers(ErrorHandler)
  .withAutoCreateTable(true)
  .withTableName(constants.skill.dynamoDBTableName)
  .lambda();


// End of Skill code -------------------------------------------------------------
// Static Language Model for reference

