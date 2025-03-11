import { activateSlashKeyOnCoupang } from '@src/coupang';
// import { sampleFunction } from '@src/sampleFunction';

// console.log('content script loaded!!!212312312123');

// Shows how to call a function defined in another module
// sampleFunction();

function main() {
  const host = window.location.host;
  console.log(host);
  if (host === 'www.coupang.com') {
    activateSlashKeyOnCoupang();
  }
}

main();
