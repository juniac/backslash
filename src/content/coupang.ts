export function activateSlashKeyOnCoupang() {
  console.log('coupang slash ');
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === '/') {
      console.log('move');
      document.getElementById('headerSearchKeyword')?.focus();
      e.preventDefault();
    }
  });
}
