document.addEventListener('DOMContentLoaded', function() {
  const pages = document.querySelectorAll('.page');
  let currentPageIndex = 0;

  function showPage(pageIndex) {
    pages[currentPageIndex].classList.add('hidden');
    pages[pageIndex].classList.remove('hidden');
    currentPageIndex = pageIndex;
  }

  function goToNextPage() {
    if (currentPageIndex < pages.length - 1) {
      showPage(currentPageIndex + 1);
    }
  }

  document.querySelectorAll('.next-button').forEach(function(button) {
    button.addEventListener('click', goToNextPage);
  });

  // 在最后一个页面显示结果
  const resultContainer = document.getElementById('result');
  const resultName = document.getElementById('result-name');
  const resultImage = document.getElementById('result-image');
  const resultDescription = document.getElementById('result-description');

  function showResult() {
    const result = calculateResult(); // 根据回答计算结果
    resultName.textContent = result;

    // 显示对应的角色图片和描述
    const characterData = {
      suguri: {
        name: 'Suguri',
        image: 'suguri.jpg',
        description: 'You have a firm will, like adventure, positive personality, strong competitiveness, like to control the overall situation and give orders in everything, strong action, and will go all out once the goal is established. Your shortcoming is that you are more likely to be arbitrary in decision-making and not easy to compromise, so you are more likely to have disputes and frictions with others. Personality traits: Self-confident, authoritative, decisive, competitive, ambitious, likes to evaluate. Strong-willed, adventurous, positive personality Strengths: Ability to control situations and make decisive decisions; people who work in this style achieve great things.'
      },
      starbreaker: {
        name: 'Starbreaker',
        image: 'starbreaker.jpg',
        description: 'Enthusiastic, easy to make friends, fluent in speech, good at building relationships, compassionate, and best suited for people-oriented work. The disadvantage is that it is easy to be too optimistic, often unable to estimate the details, and requires the cooperation of highly professional technical elites in terms of execution. Your personality characteristics: very enthusiastic, optimistic enough, fluent in eloquence, easy to make friends, personable, sincere and enthusiastic. Expressive. Pros: You are lively by nature. Exciting, they work efficiently and are good at building alliances to achieve their goals. You are well suited for jobs that require public presence, attention, and open-mindedness.'
      },
      hime: {
        name: 'Hime',
        image: 'hime.jpg',
        description: 'Peace-loving, persistent, patient, approachable, honest and reliable, conflict-avoiding and non-judgmental. In terms of behavior, show a calm, calm and self-sufficient attitude. You will pay attention to stability and long-term planning. In real life, you often reflect on yourself and focus on harmony. Even in the face of difficulties, you can calmly and calmly deal with them. In terms of decision-making, you need more time to make plans, with a firm will and a steady pace. Value Orientation: You pursue professional, mid- to long-term excellence.'
      },
      nath: {
        name: 'Nath',
        image: 'nath.jpg',
        description: 'You are analytical and precise. You are the best quality guarantor, like to regulate the details, have a reserved personality, keep your sense of proportion and be loyal to your duties. You are good at persuading others by analyzing the truth clearly, and you are objective and reasonable in dealing with things, but sometimes you get stuck in the horns and cannot get out. Your personality traits: very traditional, detail-oriented, well-organized, with a strong sense of responsibility and discipline. You are conservative, analytical, and precise. You like to formulate details, and your personality is reserved and reserved. Your advantage: You are born with the habit of finding out the truth of things, because you have the patience to examine all the details carefully and come up with a logical solution.'
      },
      sora: {
        name: 'Sora',
        image: 'sora.jpg',
        description: 'You are moderate but not extreme, you are not persistent in everything, you are extremely resilient, you are good at communication and you are a natural negotiator, you can fully integrate into various new environments and new cultures and have good adaptability. In the eyes of others, you will think you have "no personality", so " No principle is the highest principle", you know how to look at the situation and the occasion in everything. The advantages of your work style: good at adjusting your role to adapt to the environment at work, and have good communication skills.'
      }
      
    };
    
    console.log("result is"+result)
    const character = characterData[result];
    resultImage.src = character.image;
    resultDescription.textContent = character.description;

    resultContainer.classList.remove('hidden');
  }
  
  function calculateResult() {
    // Calculate the result based on selected answers
    // Modify this function according to your specific scoring logic
    // Example implementation based on the provided HTML structure:
    const scoreSuguri = parseInt(getRadioValue('question1')) + parseInt(getRadioValue('question10')) + parseInt(getRadioValue('question14')) + parseInt(getRadioValue('question18')) + parseInt(getRadioValue('question24')) + parseInt(getRadioValue('question30'));
    const scoreStarbreaker = parseInt(getRadioValue('question3')) + parseInt(getRadioValue('question6')) + parseInt(getRadioValue('question13')) + parseInt(getRadioValue('question20')) + parseInt(getRadioValue('question22')) + parseInt(getRadioValue('question29'));
    const scoreHime = parseInt(getRadioValue('question2')) + parseInt(getRadioValue('question8')) + parseInt(getRadioValue('question15')) + parseInt(getRadioValue('question17')) + parseInt(getRadioValue('question25')) + parseInt(getRadioValue('question28'));
    const scoreNath = parseInt(getRadioValue('question1')) + parseInt(getRadioValue('question7')) + parseInt(getRadioValue('question11')) + parseInt(getRadioValue('question16')) + parseInt(getRadioValue('question21')) + parseInt(getRadioValue('question26'));
    const scoreSora = parseInt(getRadioValue('question4')) + parseInt(getRadioValue('question9')) + parseInt(getRadioValue('question12')) + parseInt(getRadioValue('question19')) + parseInt(getRadioValue('question23')) + parseInt(getRadioValue('question27'));
    console.log("Sugu score: "+scoreSuguri)
    // Determine the result based on the scores
    // Modify this logic to match your desired character assignment
    // Example implementation based on the provided HTML structure:
    if (scoreSuguri === scoreStarbreaker && scoreSuguri === scoreHime && scoreSuguri === scoreNath && scoreSuguri === scoreSora) {
      return 'aos2 terminator';
    }

    const scores = {
      suguri: scoreSuguri,
      starbreaker: scoreStarbreaker,
      hime: scoreHime,
      nath: scoreNath,
      sora: scoreSora
    };

    const maxScore = Math.max(scoreSuguri, scoreStarbreaker, scoreHime, scoreNath, scoreSora);
    let result = '';
    let countMaxScores = 0;

    for (const character in scores) {
      if (scores[character] === maxScore) {
        result = character;
        return result // 在这里return， 显示第一个最高分
        countMaxScores++;
      }
    }

    if (countMaxScores === 1) {
      return result;
    } else if (countMaxScores === 2) {
      // Handle multiple results combination if needed
      // Modify this logic based on your desired character combinations
      if ((result === 'suguri' && scores.starbreaker > scores.hime) || (result === 'starbreaker' && scores.suguri > scores.hime)) {
        return 'suguri-starbreaker';
      } else if ((result === 'suguri' && scores.hime > scores.starbreaker) || (result === 'hime' && scores.suguri > scores.starbreaker)) {
        return 'suguri-hime';
      } else if ((result === 'suguri' && scores.nath > scores.starbreaker) || (result === 'nath' && scores.suguri > scores.starbreaker)) {
        return 'suguri-nath';
      } else if ((result === 'suguri' && scores.sora > scores.starbreaker) || (result === 'sora' && scores.suguri > scores.starbreaker)) {
        return 'suguri-sora';
      } else if ((result === 'starbreaker' && scores.hime > scores.suguri) || (result === 'hime' && scores.starbreaker > scores.suguri)) {
        return 'starbreaker-hime';
      } else if ((result === 'starbreaker' && scores.nath > scores.suguri) || (result === 'nath' && scores.starbreaker > scores.suguri)) {
        return 'starbreaker-nath';
      } else if ((result === 'starbreaker' && scores.sora > scores.suguri) || (result === 'sora' && scores.starbreaker > scores.suguri)) {
        return 'starbreaker-sora';
      } else if ((result === 'hime' && scores.nath > scores.suguri) || (result === 'nath' && scores.hime > scores.suguri)) {
        return 'hime-nath';
      } else if ((result === 'hime' && scores.sora > scores.suguri) || (result === 'sora' && scores.hime > scores.suguri)) {
        return 'hime-sora';
      } else if ((result === 'nath' && scores.sora > scores.suguri) || (result === 'sora' && scores.nath > scores.suguri)) {
        return 'nath-sora';
      }
    }
  }

  function getRadioValue(name) {
    const radios = document.getElementsByName(name);
    for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      console.log(radios[i].value)
    return radios[i].value;
    }
    }
    return 0;
    }


    function showFinishButton() {
      const finishContainer = document.getElementById('finish-container');
      finishContainer.classList.remove('hidden');
    }
    
    function goToResultPage() {
      showPage(pages.length - 1); // 跳转到结果页面
      showResult(); // 显示结果
    }
    
    const question30Inputs = document.getElementsByName('question30');
    for (let i = 0; i < question30Inputs.length; i++) {
      question30Inputs[i].addEventListener('change', function() {
        if (this.checked) {
          showFinishButton();
        }
      });
    }
    
    document.getElementById('finish-button').addEventListener('click', goToResultPage);


  });
  function showResult() {
    const result = calculateResult(); // 根据回答计算结果
    resultName.textContent = result;
  
    // 显示对应的角色图片和描述
    const character = characterData[result];
    resultImage.src = character.image;
    resultDescription.textContent = character.description;
  
    resultContainer.classList.remove('hidden');
  }
  
  