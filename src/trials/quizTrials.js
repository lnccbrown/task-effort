import { lang,  MTURK } from '../config/main'
import { generateWaitSet } from '../lib/utils'
import { jsPsych } from 'jspsych-react'
import { baseStimulus } from '../lib/markup/stimuli'


// questionnaire = {
//     'type': 'survey-multi-select-feedback',
//     'questions': [
//         {'prompt': 'The green balloon requires more pumps.', 'options': ['Yes', 'No'], 'correct': 'Yes'},
//         {'prompt': 'You will always get the points once you reach the pin.', 'options': ['Yes', 'No'], 'correct': 'No'},
//         {'prompt': 'For the green balloon, you can keep pressing once you reach the pin to get bonus points.', 'options': ['Yes', 'No'], 'correct': 'Yes'},
//         {'prompt': 'Your accumulated points will be converted into $ bonus.', 'options': ['Yes', 'No'], 'correct': 'Yes'},
//     ],
//     'required': True,
//     'preamble': 'Answer all of the questions below correctly to continue.',
//     'button_label': 'Check answers',
//     'required_msg': 'Please answer all questions correctly before continuing.'
// }



export default quiz
