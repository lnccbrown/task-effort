import { jsPsych } from "jspsych-react";

export function survey_multi_select_feedback() {

  var plugin = {};

  plugin.info = {
    name: 'survey-multi-select',
    description: '',
    parameters: {
      questions: {
        type: jsPsych.plugins.parameterType.COMPLEX,
        array: true,
        pretty_name: 'Questions',
        nested: {
          prompt: {type: jsPsych.plugins.parameterType.STRING,
                    pretty_name: 'Prompt',
                    default: undefined,
                    description: 'The strings that will be associated with a group of options.'},
          options: {type: jsPsych.plugins.parameterType.STRING,
                    pretty_name: 'Options',
                    array: true,
                    default: undefined,
                    description: 'Displays options for an individual question.'},
          horizontal: {type: jsPsych.plugins.parameterType.BOOL,
                        pretty_name: 'Horizontal',
                        default: false,
                       description: 'If true, then questions are centered and options are displayed horizontally.'},
            correct: {type: jsPsych.plugins.parameterType.INT,
                    pretty_name: 'Correct',
                    array: true,
                    default: undefined,
                    description: 'Which answer is correct.'},
        }
      },
      required: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Required',
        default: false,
        description: 'Subject will be required to pick an option for each question.'
      },
      preamble: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Preamble',
        default: '',
        description: 'HTML formatted string to display at the top of the page above all the questions.'
      },
      button_label: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Button label',
        default:  'Continue',
          description: 'Label of the button.'
      },
      required_msg: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Message',
        default: 'All answers must be provided',
        description: 'Message to display if not all answers provided or not all correct.'
      }
    }
  }
  plugin.trial = function(display_element, trial) {
    var plugin_id_name = "jspsych-survey-multi-select";
    var plugin_id_selector = '#' + plugin_id_name;
    var _join = function( /*args*/ ) {
      var arr = Array.prototype.slice.call(arguments, _join.length);
      return arr.join(separator = '-');
    }


    // inject CSS for trial
    display_element.innerHTML = '<style id="jspsych-survey-multi-select-css"></style>';
    var cssstr = ".jspsych-survey-multi-select-question { margin-top: 2em; margin-bottom: 2em; text-align: left; }"+
      ".jspsych-survey-multi-select-text span.required {color: darkred;}"+
      ".jspsych-survey-multi-select-horizontal .jspsych-survey-multi-select-text {  text-align: center;}"+
      ".jspsych-survey-multi-select-option { line-height: 2; }"+
      ".jspsych-survey-multi-select-horizontal .jspsych-survey-multi-select-option {  display: inline-block;  margin-left: 1em;  margin-right: 1em;  vertical-align: top;}"+
      "label.jspsych-survey-multi-select-text input[type='checkbox'] {margin-right: 1em;}"

    display_element.querySelector('#jspsych-survey-multi-select-css').innerHTML = cssstr;

    // form element
    var trial_form_id = _join(plugin_id_name, "form");
    display_element.innerHTML += '<form id="'+trial_form_id+'"></form>';
    var trial_form = display_element.querySelector("#" + trial_form_id);
    // show preamble text
    var preamble_id_name = _join(plugin_id_name, 'preamble');
    trial_form.innerHTML += '<div id="'+preamble_id_name+'" class="'+preamble_id_name+'">'+trial.preamble+'</div>';

    // add multiple-select questions
    for (var i = 0; i < trial.questions.length; i++) {
      // create question container
      var question_classes = [_join(plugin_id_name, 'question')];
      if (trial.questions[i].horizontal) {
        question_classes.push(_join(plugin_id_name, 'horizontal'));
      }

      trial_form.innerHTML += '<div id="'+_join(plugin_id_name, i)+'" class="'+question_classes.join(' ')+'"></div>';

      var question_selector = _join(plugin_id_selector, i);

      // add question text
      display_element.querySelector(question_selector).innerHTML += '<p id="survey-question" class="' + plugin_id_name + '-text survey-multi-select">' + trial.questions[i].prompt + '</p>';

      // create option check boxes
      for (var j = 0; j < trial.questions[i].options.length; j++) {
        var option_id_name = _join(plugin_id_name, "option", i, j),
          option_id_selector = '#' + option_id_name;

        // add check box container
        display_element.querySelector(question_selector).innerHTML += '<div id="'+option_id_name+'" class="'+_join(plugin_id_name, 'option')+'"></div>';

        // add label and question text
        var form = document.getElementById(option_id_name)
        var input_name = _join(plugin_id_name, 'response', i);
        var input_id = _join(plugin_id_name, 'response', i, j);
        var label = document.createElement('label');
        label.setAttribute('class', plugin_id_name+'-text');
        label.innerHTML = trial.questions[i].options[j];
        label.setAttribute('for', input_id)

        // create  checkboxes
        var input = document.createElement('input');
        input.setAttribute('type', "radio");
        input.setAttribute('name', input_name);
        input.setAttribute('id', input_id);
        input.setAttribute('value', trial.questions[i].options[j])
        form.appendChild(label)
        form.insertBefore(input, label)
      }
    }
    // add submit button
    trial_form.innerHTML +='<div class="fail-message"></div>'
    trial_form.innerHTML += '<button type="button" id="submit_button" class="submit_button">' + (trial.button_label ? trial.button_label : '') + '</button>';

      trial_form.lastElementChild.addEventListener('click', function(event) {
      event.preventDefault();
      // measure response time
      var endTime = (new Date()).getTime();
      var response_time = endTime - startTime;

      // create object to hold responses
      var matches = display_element.querySelectorAll("div." + plugin_id_name + "-question");
      var question_data = {};
      var has_response = [];
      var correct_answer = [];
      for(var index=0; index<matches.length; index++){
        match = matches[index];
          var val = [];
        var inputboxes = match.querySelectorAll("input[type=radio]:checked")
        for(var j=0; j<inputboxes.length; j++){
          currentChecked = inputboxes[j];
            val.push(currentChecked.value);
        }
        if (val.length == 1 && val[0] == trial.questions[index].correct) {
            correct_answer.push(true);
        }
        else {
            correct_answer.push(false);
        }

        var id = 'Q' + index
        var obje = {};
        obje[id] = val;
        Object.assign(question_data, obje);
        if(val.length == 0){ has_response.push(false); } else { has_response.push(true); }
      }

      // adds validation to check if at least one option is selected
          if((trial.required && has_response.includes(false)) || correct_answer.includes(false)) {
        var inputboxes = display_element.querySelectorAll("input[type=checkbox]")
        display_element.querySelector(".fail-message").innerHTML = '<span style="color: red;" class="required">'+trial.required_msg+'</span>';
      } else {
        // save data
        var trial_data = {
          "rt": response_time,
          "responses": JSON.stringify(question_data)
        };
        display_element.innerHTML = '';

        // next trial
        jsPsych.finishTrial(trial_data);
      }
    });

    var startTime = (new Date()).getTime();
  };

  return plugin;
}
// })();
