import _ from 'lodash';

export function activateKeywordTrackerOnSoccerline() {
  console.log('activateKeywordTrackerOnSoccerline');
  const pathname = window.location.pathname;
  console.log('pathname', pathname);

  const keywords = ['서동주', '용두왕', '짱구', '으윽나온다'];
  const keywordData = {
    서동주: '설레발',
  };

  if (pathname.startsWith('/board')) {
    // const contentListRegex = /\/board;
    // const contentViewRegex = /\/board\/contentView/;

    if (pathname.endsWith('/board')) {
      console.log('content list');
      const nicknames = document.querySelectorAll('#boardListContainer table tr td:nth-child(3)');
      nicknames.forEach(nickname => {
        const nicknameElement = nickname as HTMLElement;
        if (nicknameElement.textContent && keywords.includes(nicknameElement.textContent)) {
          console.log('nicknameElement', nicknameElement);
          if (_.has(keywordData, nicknameElement.textContent)) {
            showKeywordMemo(nicknameElement);
          }
        }
      });
    } else {
      console.log('content view');
    }
  }
}

export function showKeywordMemo(element: HTMLElement) {
  const nickname = element.textContent;
  element.innerHTML = '';
  const nicknameWrapper = document.createElement('div');
  const nicknameBody = document.createElement('span');
  const memo = document.createElement('span');
  nicknameWrapper.style.width = '100%';
  // memo.style.top = '100%';
  // memo.style.left = '100%';
  memo.style.fontSize = '0.7em';
  memo.style.backgroundColor = '#fff094';
  // memo.style.height = '10px';
  nicknameBody.innerHTML = `${nickname}`;
  memo.innerHTML = '메모메모';
  nicknameWrapper.appendChild(nicknameBody);
  nicknameWrapper.appendChild(memo);

  element.appendChild(nicknameWrapper);
}
