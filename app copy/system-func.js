export function scrollNavbar() {
  if (window.scrollY > 100) {
    document.querySelector('.navbar').classList.add('navb-scroll');
  } else {
    document.querySelector('.navbar').classList.remove('navb-scroll');
  }
}