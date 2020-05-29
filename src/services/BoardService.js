import HttpService from './HttpService';
// import utils from './utils';

export default {
  add,
  query,
  get,
  update,
  remove,
  createEmptyBoard,
  duplicateBoard
};

function query() {
  return HttpService.get('board');
}

function get(boardId) {
  return HttpService.get(`board/${boardId}`);
}

function update(board) {
  return HttpService.put(`board/${board._id}`, board);
}

function remove(boardId) {
  return HttpService.delete(`board/${boardId}`);
}

function add(board) {
  return HttpService.post('board', board);
}

function createEmptyBoard(direction, user = { _id: 'guest', username: 'guest' }) {
  return {
    boardBgImage: 'https://images.unsplash.com/photo-1511649475669-e288648b2339?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjExMTc0M30',
    boardBgThumbnail: 'https://images.unsplash.com/photo-1511649475669-e288648b2339?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjExMTc0M30',
    boardMembers: [],
    cards: {},
    createdBy: { _id: user._id || 'guest', username: user.username || 'guest' },
    direction: direction,
    history: [],
    lists: {},
    listsOrder: [],
    title: 'New Board'
  }
}

function duplicateBoard(board) {
  // const newCards = _duplicateCards(board.cards);
  // const newLists = _duplicateLists(board.lists);
  // const newBoard = {
  //   ...board,
  //   boardMembers: [...board.boardMembers],
  //   cards: newCards,
  //   lists: newLists,
  //   listsOrder: [...board.listsOrder],
  //   history: [],
  //   createdBy: { ...board.createdBy }
  // }
  const newBoard = JSON.parse(JSON.stringify(board));
  delete newBoard._id;
  return newBoard;
}

// function _duplicateCards(cards) {
//   let tempCards = JSON.parse(JSON.stringify(cards));
//   for (const key in tempCards) {
//     const newKey = utils.getRandomId();
//     const oldCard = tempCards[key];
//     tempCards[newKey] = {
//       ...oldCard,
//       id: newKey,
//       createdAt: Date.now(),
//       labels: [...oldCard.labels],
//       todos: [...oldCard.todos],
//       cardMembers: [...oldCard.cardMembers]
//     }
//     delete tempCards[oldCard.id];
//   }
//   return tempCards;
// }

// function _duplicateLists(lists) {
//   let tempLists = JSON.parse(JSON.stringify(lists));
//   for (const key in tempLists) {
//     const newKey = utils.getRandomId();
//     const oldList = tempLists[key];
//     tempLists[newKey] = {
//       ...oldList,
//       id: newKey,
//       cardIds: [...oldList.cardIds]
//     }
//     delete tempLists[oldList.id];
//   }
//   return tempLists;
// }