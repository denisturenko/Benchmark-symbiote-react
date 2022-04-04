import { BaseComponent } from './libs/submodules/symbiote/core/BaseComponent.js';
import { Data } from './libs/submodules/symbiote/core/Data.js';

const state = new Data({
  schema: {
    time: Date.now(),
  },
});

class MyApp extends BaseComponent {

  init$ = {
    clicked: false,
    click: () => {
      this.$.clicked = true;
    },
  }

  initCallback() {
    state.sub('time', (val) => {
      this.$.clicked = val;
    });
  }

}

MyApp.template = /*html*/ `
    {{clicked}}
  <button set="onclick: click">Like</button>
`;

const domContainer = document.querySelector('#for-react');
const likeButton = React.createElement(LikeButton, { withUpdate: false })
const likeButton2 = React.createElement(LikeButton, { withUpdate: true })


var suite = new Benchmark.Suite;

suite.add('Render -> Symbiote.js', function() {
  document.body.innerHTML = '';
  MyApp.reg('my-app');
})
 .add('Render -> React.js', function() {
   document.body.innerHTML = ''
   ReactDOM.render(likeButton, domContainer);
 })
 // add listeners`
 .on('cycle', function(event) {
   console.log(String(event.target));
 })
 .on('complete', function() {
   console.log('Render -> Fastest is ' + this.filter('fastest').map('name'));

   var suite2 = new Benchmark.Suite;

   suite2.add('Update -> Symbiote.js', function() {
     document.body.innerHTML = '';
     MyApp.reg('my-app');
     state.pub('time', Date.now());
   })
    .add('Update -> React.js', function() {
      document.body.innerHTML = ''
      ReactDOM.render(likeButton2, domContainer);
    })
    .on('cycle', function(event) {
      console.log(String(event.target));
    })
    .on('complete', function() {
      console.log('Update -> Fastest is ' + this.filter('fastest').map('name'));
    })
    .run({ 'async': true })


 })
 .run({ 'async': true })



