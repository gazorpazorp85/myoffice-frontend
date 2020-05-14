import HttpService from './HttpService';

export default {
  add,
  query,
  get,
  update,
  remove
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