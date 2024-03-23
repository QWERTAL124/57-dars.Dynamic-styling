window.addEventListener('DOMContentLoaded', () => {
  const tabsParent = document.querySelector('.tabheader__items'),
    tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    loader = document.querySelector('.loader')

  // Loader
  // setTimeout(() => {
  //   loader.style.opacity = '0'
  //   setTimeout(() => {
  //     loader.style.display = 'none'
  //   }, 500)
  // }, 2000)

  // Tabs
  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add('hide')
      item.classList.remove('show', 'fade')
    })

    tabs.forEach((item) => {
      item.classList.remove('tabheader__item_active')
    })
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade')
    tabsContent[i].classList.remove('hide')
    tabs[i].classList.add('tabheader__item_active')
  }

  hideTabContent()
  showTabContent()

  tabsParent.addEventListener('click', (event) => {
    const target = event.target
    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, idx) => {
        if (target == item) {
          hideTabContent()
          showTabContent(idx)
        }
      })
    }
  })

  // Timer

  const deadline = '2022-08-11'

  function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds
    const timer = Date.parse(endtime) - Date.parse(new Date())

    if (timer <= 0) {
      days = 0
      hours = 0
      minutes = 0
      seconds = 0
    } else {
      days = Math.floor(timer / (1000 * 60 * 60 * 24))
      hours = Math.floor((timer / (1000 * 60 * 60)) % 24)
      minutes = Math.floor((timer / 1000 / 60) % 60)
      seconds = Math.floor((timer / 1000) % 60)
    }

    return { timer, days, hours, minutes, seconds }
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`
    } else {
      return num
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timeInterval = setInterval(updatClock, 1000)

    updatClock()

    function updatClock() {
      const t = getTimeRemaining(endtime)

      days.innerHTML = getZero(t.days)
      hours.innerHTML = getZero(t.hours)
      minutes.innerHTML = getZero(t.minutes)
      seconds.innerHTML = getZero(t.seconds)

      if (t.timer <= 0) {
        clearInterval(timeInterval)
      }
    }
  }

  setClock('.timer', deadline)


  // Men ketaman endi boshqa joyarga
  // Xayol-xotirangdan ketaman yiroq,
  // Men ketaman endi boshqa yerlarga,
  // Erkin yashayvergin endi to abad,
  // MEN KETAMAN ENDI BOSHQA SHAHARGA ,
  // ENDI QURAVERGIN O'Z ORZUINGNI
  // Men ketaman endi boshqa yerlarga,
  // Balki vaqti keldi sening davringni
  // Men endi ketaman bu o'lkalardan
  // O'y-xayolingdan ketaman butkul
  // Balki bo'lgandirman yomon qahramon
  // Ba'zi odamlarning hikoyasinda
  // Balki bo'lgandirman yaxshi qahramon
  // Bizni tushunguvchi oddiy dillarda
  // Men kettim afsus bu o'lkalardan
  // Taqdir aytmagandi baxtni bu yerda

  // Modal
  const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalCloseBtn = document.querySelector('[data-close]');

  // DRY
  function closeModal(){
    modal.classList.remove('show');
    modal.classList.add('hide'); 
    document.body.style.overflow = '';
  }

  function openModal(){
    modal.classList.add('show');
    modal.classList.remove('hide');
    // modalni bajarish uchun
    // document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId);
  }

  modalTrigger.forEach((item)=>{
    item.addEventListener('click',openModal)
  })
 
 

  // O'chirish uchun 2-usul

  modalCloseBtn.addEventListener( 'click', closeModal );

  modal.addEventListener( 'click', (e) => {
    if ( e.target == modal ){
      closeModal();
    }
  })
  // Escape tugmasi bosilganda ham modalni o'chirish

  document.addEventListener('keydown',(e)=>{
    if( e.code == "Escape" && modal.classList.contains('show') ){
      closeModal();
    }
  })
  // // Modalni avtomatik tarzda qayta chiqarish

  // const modalTimerId = setTimeout(openModal,3000);

  // console.log();
 
  // function showModal(){
  //   if ( window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight ){
  //     openModal();
  //     window.removeEventListener('scroll',showModal);
  //   }
  // }
  // window.addEventListener ( 'scroll', showModal )

  // Loyiha Class 

class MenuCard {
  constructor(src, alt, title, descr, price,parentSelector) {
    this.src = src,
    this.alt = alt,
    this.title = title,
    this.descr = descr,
    this.price = price,
    this.transfer = 11000,
    this.parent = document.querySelector(parentSelector)
    this.changeToUZS()
  }
  changeToUZS(){
    this.price = this.price * this.transfer
  }
  render(){
    const element = document.createElement('div')
    element.innerHTML = `
      <div class="menu__item">
        <img src="${this.src}" alt="${this.alt}" />
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Price:</div>
          <div class="menu__item-total"><span>${this.price}</span>uzs/month</div>
        </div>
    </div>

    `
    this.parent.append(element)
  }
 }
 new MenuCard(
  'img/tabs/1.png',
  'usual',
  'Plan "Usual"',
  'Loream ipsum, dolor sit amet consectetur adibpisicing elit',
  10,
  '.menu .container'
 ).render()

  new MenuCard(
  'img/tabs/2.jpg',
  'Plan',
  'Plan "Premium"',
  'Loream ipsum, dolor sit amet consectetur adibpisicing elit',
  20,
  '.menu .container'
 ).render()

  new MenuCard(
  'img/tabs/3.jpg',
  'vip',
  'Plan "VIP"',
  'Loream ipsum, dolor sit amet consectetur adibpisicing elit',
  10,
  '.menu .container'
 ).render()

})
 
// 56. Form

const form = document.querySelectorAll("form");
const msg = {
  loading : "Loading",
  success : "Thanks for submitting our form",
  failure : "Something went wrong",
};
form.forEach((form)=>{
  postData(form);
})
function postData(form) {
  form.addEventListener("submit", (e)=>{
    const statusMessage = document.createElement('div');
    statusMessage.textContent = msg.loading;
    form.append(statusMessage)
    e.preventDefault();

    const request = new XMLHttpRequest();
    request.open("POST", "server.php");

    //request.setRequestHeader("Content-Type", "multipart/form-data"); // Lekin biz form konstruktorini yaratganimizda ushbu sarlavaha formning o'zi bilan keladi

    const formData = new FormData(form);

    request.send(formData);

    request.addEventListener('load', ()=>{
      if(request.status === 200 ){
        console.log(request.response);
        statusMessage.textContent = msg.success;
      } else{
        statusMessage.textContent = msg.failure;
      }
    })

  })
}

