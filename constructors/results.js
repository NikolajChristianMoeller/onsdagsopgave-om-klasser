import { findMember } from "../app.js";

function construct(resultData) {
    //sprøgsmål kald funktioner og visning af datoer i contruktoren eller i showResults
    const ResultsObject = {
        date: resultData.date,
        id: resultData.id,
        memberId: resultData.memberId,
        discipline: resultData.discipline,
        type: resultData.resultType,
        compareTime: resultData.time,
        member: findMember(resultData.memberId),
        displayTime: undefined,
        get isCompetition() {
            return this.type === "competition"
        },
        get isTraining() {
            return this.type === "training"
        },
        setTimeFromString(input) {
            const minutter = Number(input.substring(0, 2));
            const sekunder = Number(input.substring(3, 5));
            const miliSekunder = Number(input.substring(6, 8)) * 10;

            this.time = miliSekunder + sekunder * 1000 + minutter * 60000;


        },
        getTimeAsString() {

            console.log(`totaltid ${this.time}`)

            const minutes = Math.floor((this.time / 60000))
            console.log(`minutes ${minutes}`)


            const msLeft = this.time - (minutes * 60000)
            console.log(`ms ${msLeft}`)

            const seconds = Math.floor((msLeft / 1000)); ///
            console.log(`seconds ${seconds}`)


            const decaSeconds = (this.time % 1000) / 10; ///
            console.log(`decasecs ${decaSeconds}`)

            let timeView;

            if (minutes < 10) {
                timeView = `0${minutes}:${seconds}:${decaSeconds}`
            }
            else if (minutes === 0) {
                timeView = `00:${seconds}:${decaSeconds}`
            } else if (seconds < 10) {
                timeView = `00:0${seconds}:${decaSeconds}`
            }
            else if (seconds === 0) {
                timeView = `00:00:${decaSeconds}`
            } else if (decaSeconds === 0) {
                timeView = `00:00:000`
            } else if (decaSeconds < 10) {
                timeView = `00:00:0${decaSeconds}`
            }
            else {
                timeView = `${minutes}:${seconds}:${decaSeconds}`
            }

            this.displayTime = timeView;
        }

    }

    ResultsObject.setTimeFromString(resultData.time);
    ResultsObject.getTimeAsString();

    Object.defineProperties(ResultsObject, {
        id: {
            writable: false
        },
        isCompetition: {
            enumerable: false
        },
        isTraining: {
            enumerable: false
        },
        time: {
            enumerable: false
        }

    })
    return ResultsObject;

};

export { construct }