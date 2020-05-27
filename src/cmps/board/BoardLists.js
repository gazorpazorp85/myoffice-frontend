import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import NaturalDragAnimation from 'natural-drag-animation-rbdnd';

import ListMenuIcon from '@material-ui/icons/MoreHoriz';

import AddCardButton from './list/AddCardButton';
import CardForm from './card/CardForm';
import CardsList from './list/CardsList';
import ListMenu from './list/ListMenu';
import MiniCardDetails from './miniCard/MiniCardDetails';
import TitleContainer from './TitleContainer';

import ListService from '../../services/ListService';

export default class BoardLists extends Component {

    state = {
        isListMenuShown: false,
        miniCardDetails: '',
        selectedListId: '',
        toggleAddCardForm: false,
        toggleMiniCardDetails: false
    }

    titleMenuClickHandler = (ev, listId) => {
        ev.stopPropagation();
        this.setState(prevState => ({ isListMenuShown: !prevState.isListMenuShown, selectedListId: listId }));
    }

    closeListMenu = () => {
        this.setState({ isListMenuShown: false, selectedListId: '' });
    }

    toggleMiniCardDetailsHandler = (miniCardDetails) => {
        this.setState(prevState => ({
            toggleMiniCardDetails: !prevState.toggleMiniCardDetails,
            miniCardDetails: prevState.miniCardDetails === miniCardDetails ? '' : miniCardDetails
        }));
    }

    onDragEnd = (result) => {

        const { destination, source, draggableId, type } = result;
        const { board, direction, updateBoard, user } = this.props;

        if (!destination) return;
        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) return;

        let newBoard = { ...board };
        const notificationType = 'success';

        if (type === 'list') {
            let newListsOrder = direction === 'rtl' ? [...newBoard.listsOrder].reverse() : [...newBoard.listsOrder];
            newListsOrder.splice(source.index, 1);
            newListsOrder.splice(destination.index, 0, draggableId);
            newBoard.listsOrder = direction === 'rtl' ? newListsOrder.reverse() : newListsOrder;
            const listTitle = board.lists[draggableId].title;
            const historyItem = { user: user.username, item: listTitle, key1: 'theList', key2: 'listMoved' };
            const msg = `${window.i18nData.theList}${listTitle}${window.i18nData.listMoved}${user.username}`;
            updateBoard(newBoard, msg, notificationType, historyItem);
            this.setState({ listsOrder: newBoard.listsOrder });
            return;
        }

        const startingList = board.lists[source.droppableId];
        const finishList = board.lists[destination.droppableId];
        const newStartCardIds = [...startingList.cardIds];
        const newList = { ...startingList, cardIds: newStartCardIds };
        const cardTitle = board.cards[draggableId].title ? board.cards[draggableId].title : board.cards[draggableId].type;
        newStartCardIds.splice(source.index, 1);

        if (startingList === finishList) {
            newStartCardIds.splice(destination.index, 0, draggableId);
            newBoard = { ...newBoard, lists: { ...newBoard.lists, [newList.id]: newList } };
        } else {
            const newFinishCardIds = [...finishList.cardIds];
            newFinishCardIds.splice(destination.index, 0, draggableId);
            const newFinishList = { ...finishList, cardIds: newFinishCardIds };
            newBoard = { ...newBoard, lists: { ...newBoard.lists, [newList.id]: newList, [newFinishList.id]: newFinishList } };
        }

        const msg = `${window.i18nData.theList}${cardTitle}${window.i18nData.listMoved}${user.username}`;
        const historyItem = { user: user.username, item: cardTitle, key1: 'theCard', key2: 'cardMoved' };
        updateBoard(newBoard, msg, notificationType, historyItem);
    }

    toggleAddCardFormHandler = (listId) => {
        this.setState(prevState => ({ toggleAddCardForm: !prevState.toggleAddCardForm, selectedListId: prevState.selectedListId === listId ? '' : listId }))
    }

    directionHandler = (board, direction) => {
        return direction === board.direction ? [...board.listsOrder] : [...board.listsOrder].reverse();
    }

    onDelete = (id) => {
        const { board, updateBoard, user } = this.props;
        ListService.deleteList(board, id, updateBoard, user);
        this.closeListMenu();
    }

    onDuplicateList = (list) => {
        const { board, updateBoard, user } = this.props;
        ListService.duplicateList(board, list, updateBoard, user);
        this.closeListMenu();
    }

    render() {

        let { board, direction, selectedCardHandler, toggle, updateBoard, user } = this.props;
        let { isListMenuShown, miniCardDetails, selectedListId, toggleAddCardForm, toggleMiniCardDetails } = this.state;
        const listsOrder = this.directionHandler(board, direction);
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId='all-lists' direction='horizontal' type='list'>
                    {provided => (
                        <div className='flex board-list-container' {...provided.droppableProps} ref={provided.innerRef}>
                            {listsOrder.map((listId, idx) => {

                                let list = board.lists[listId];
                                let cards = list.cardIds.map(id => board.cards[id]);
                                return (
                                    <Draggable draggableId={listId} key={list.id} index={idx}>
                                        {(provided, snapshot) => (
                                            <NaturalDragAnimation style={provided.draggableProps.style} snapshot={snapshot} rotationMultiplier={1.3}>
                                                {style => (
                                                    <div className="flex column list" {...provided.draggableProps} ref={provided.innerRef} style={style} dir={direction}>
                                                        <div className="flex list-header" {...provided.dragHandleProps}>
                                                            <div className="list-title-container">
                                                                <TitleContainer board={board} list={list} updateBoard={updateBoard} user={user} />
                                                            </div>
                                                            <div className="btn title-menu" onClick={(ev) => this.titleMenuClickHandler(ev, list.id)}>
                                                                <ListMenuIcon />
                                                            </div>
                                                        </div>
                                                        {isListMenuShown && (selectedListId === list.id) &&
                                                            <ListMenu list={list} onDelete={this.onDelete} onDuplicateList={this.onDuplicateList} />}
                                                        <Droppable droppableId={list.id} type="card">
                                                            {(provided, snapshot) => {
                                                                return <CardsList
                                                                    cards={cards}
                                                                    direction={direction}
                                                                    innerRef={provided.innerRef}
                                                                    isDraggingOver={snapshot.isDraggingOver}
                                                                    list={list}
                                                                    provided={provided}
                                                                    selectedCardHandler={selectedCardHandler}
                                                                    toggle={toggle}
                                                                    toggleMiniCardDetailsHandler={this.toggleMiniCardDetailsHandler}
                                                                    updateBoard={updateBoard}
                                                                    user={user} />
                                                            }}
                                                        </Droppable>
                                                        {toggleAddCardForm && (selectedListId === list.id) ?
                                                            <CardForm
                                                                board={board}
                                                                list={list}
                                                                toggleAddCardFormHandler={this.toggleAddCardFormHandler}
                                                                updateBoard={updateBoard}
                                                                user={user} /> :
                                                            <AddCardButton list={list} toggleAddCardFormHandler={this.toggleAddCardFormHandler} />}
                                                    </div>
                                                )}
                                            </NaturalDragAnimation>
                                        )}
                                    </Draggable>
                                )
                            })}
                            {provided.placeholder}
                            {toggleMiniCardDetails && <MiniCardDetails
                                board={board}
                                direction={direction}
                                miniCard={miniCardDetails}
                                toggleMiniCardDetailsHandler={this.toggleMiniCardDetailsHandler}
                                updateBoard={updateBoard}
                                user={user} />}
                        </div>)}
                </Droppable>
            </DragDropContext>
        );
    }
}