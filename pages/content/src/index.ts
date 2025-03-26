import { activateSlashKeyOnCoupang } from '@src/coupang';
import { activateKeywordTrackerOnSoccerline } from '@src/tracker';
// import { sampleFunction } from '@src/sampleFunction';

// console.log('content script loaded!!!212312312123');

// Shows how to call a function defined in another module
// sampleFunction();

function main() {
  console.log('content script loaded');
  const host = window.location.host;
  // const search = window.location.search;

  if (host === 'www.coupang.com') {
    activateSlashKeyOnCoupang();
  }
  if (host === 'soccerline.kr') {
    // console.log(pathname);
    activateKeywordTrackerOnSoccerline();
  }
}

main();
