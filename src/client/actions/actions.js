/*
 * action 类型
 */
export const ACTIVATE = 'ACTIVATE';
export const CANCEL_ACTIVATE = 'CANCEL_ACTIVATE';
export const MOVE = 'MOVE';
export const FLIP = 'FLIP';
export const FIRST_FLIP = 'FIRST_FLIP';
export const WINNER = 'WINNER';
export const AI = 'AI';
export const FIRST_AI= 'FIRST_AI';
export const RESTART= 'RESTART';


/*
 * action 创建函数
 */

export function activate(x,y) {
  return { type: ACTIVATE ,x,y}
}

export function move(prex,prey,x,y) {
  return { type: MOVE ,x,y,prex,prey}
}
export function flip(x,y) {
  return { type: FLIP ,x,y}
}
export function firstFlip(x,y){
  return { type: FIRST_FLIP ,x,y}
}
export function winner(group ,prex,prey,x,y){
  return { type: WINNER ,x,y,prex,prey,group}
}
