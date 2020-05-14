import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import NaturalDragAnimation from 'natural-drag-animation-rbdnd';

import AddCardButton from './list/AddCardButton';
import CardForm from './card/CardForm';
import CardsList from './list/CardsList';
import ListMenu from './list/ListMenu';

import MiniCardDynamicComponent from './miniCard/MiniCardDynamicComponent';

export default class BoardLists extends Component {

    state = {
        isListMenuShown: false,
        listsOrder: [],
        miniCardDetails: '',
        selectedListId: '',
        title: '',
        toggleAddCardForm: false,
        toggleMiniCardDetails: false
    }

    componentDidMount() {
        const { direction, board } = this.props;
        this.directionHandler(direction, board.direction, [...board.listsOrder]);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.direction !== this.props.direction) {
            this.setState({ listsOrder: this.state.listsOrder.reverse() });
        } else if (prevProps.board.listsOrder !== this.props.board.listsOrder) {
            this.directionHandler(this.props.direction, this.props.board.direction, [...this.props.board.listsOrder]);
        }
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

        if (type === 'list') {
            let newListsOrder = direction === 'rtl' ? [...newBoard.listsOrder].reverse() : [...newBoard.listsOrder];
            newListsOrder.splice(source.index, 1);
            newListsOrder.splice(destination.index, 0, draggableId);
            newBoard = { ...newBoard, listsOrder: direction === 'rtl' ? newListsOrder.reverse() : newListsOrder };
            const listTitle = board.lists[draggableId].title;
            const historyItem = { user: user.username, item: listTitle, key1: 'theList', key2: 'listMoved' };
            const msg = `${window.i18nData.theList}${listTitle}${window.i18nData.listMoved}${user.username}`;
            const notificationType = 'success';
            updateBoard(newBoard, msg, notificationType, historyItem);
            console.log('boardList List Movement: ', newBoard);
            return;
        }

        const startingList = board.lists[source.droppableId];
        const finishList = board.lists[destination.droppableId];
        const newStartCardIds = [...startingList.cardIds];
        const newList = { ...startingList, cardIds: newStartCardIds };
        const cardTitle = board.cards[draggableId].title;
        newStartCardIds.splice(source.index, 1);

        if (startingList === finishList) {
            newStartCardIds.splice(destination.index, 0, draggableId);
            newBoard = { ...newBoard, lists: { ...newBoard.lists, [newList.id]: newList } };
            console.log('boardList List Movement: (startingList === finishList)', newBoard);
        } else {
            const newFinishCardIds = [...finishList.cardIds];
            newFinishCardIds.splice(destination.index, 0, draggableId);
            const newFinishList = { ...finishList, cardIds: newFinishCardIds };
            newBoard = { ...newBoard, lists: { ...newBoard.lists, [newList.id]: newList, [newFinishList.id]: newFinishList } };
            console.log('boardList List Movement: (startingList !== finishList)', newBoard);
        }

        const msg = `${window.i18nData.theList}${cardTitle}${window.i18nData.listMoved}${user.username}`;
        const notificationType = 'success';
        const historyItem = { user: user.username, item: cardTitle, key1: 'theCard', key2: 'cardMoved' };
        updateBoard(newBoard, msg, notificationType, historyItem);
    }

    setListName = (listId) => {
        const listTitle = this.props.board.lists[listId].title;
        this.setState({ title: listTitle });
    }

    emitChange = (ev) => {
        this.setState({ title: ev.target.innerText });
    }

    saveListName = (listId, title) => {
        const { board, updateBoard, user } = this.props;
        const listTitle = board.lists[listId].title;
        if (listTitle === title) return;

        const newBoard = { ...board };
        newBoard.lists[listId].title = title;
        const historyItem = { user: user.username, item: listTitle, key1: 'thelist', key2: 'listRenamed' };
        const msg = `${window.i18nData.theList}${listTitle}${window.i18nData.listRenamed}${user.username}`;
        const notificationType = 'success';
        updateBoard(newBoard, msg, notificationType, historyItem);

    }

    toggleAddCardFormHandler = (ev, listId) => {
        ev.stopPropagation();
        this.setState(prevState => ({ toggleAddCardForm: !prevState.toggleAddCardForm, selectedListId: prevState.selectedListId === listId ? '' : listId }))
    }

    directionHandler = (direction, boardDirection, listsOrder) => {
        this.setState({ listsOrder: direction === boardDirection ? listsOrder : listsOrder.reverse() });
    }

    render() {

        let { board, direction, updateBoard, user } = this.props;
        let { isListMenuShown, listsOrder, miniCardDetails, selectedListId, title, toggleAddCardForm, toggleMiniCardDetails } = this.state;

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
                                                                <h2 className="list-title"
                                                                    contentEditable='true'
                                                                    spellCheck='false'
                                                                    onFocus={() => this.setListName(list.id)}
                                                                    onInput={(ev) => this.emitChange(ev)}
                                                                    onBlur={() => this.saveListName(list.id, title)}
                                                                    suppressContentEditableWarning={true}>
                                                                    {list.title}
                                                                </h2>
                                                            </div>
                                                            <div className="btn title-menu" onClick={(ev) => this.titleMenuClickHandler(ev, list.id)}>
                                                                <div>...</div>
                                                            </div>
                                                        </div>
                                                        {isListMenuShown && (selectedListId === list.id) && <ListMenu board={board} closeListMenu={this.closeListMenu} list={list} updateBoard={updateBoard} user={user} />}
                                                        <Droppable droppableId={list.id} type="card">
                                                            {(provided, snapshot) => {
                                                                return <CardsList
                                                                    cards={cards}
                                                                    innerRef={provided.innerRef}
                                                                    list={list}
                                                                    provided={provided}
                                                                    isDraggingOver={snapshot.isDraggingOver}
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
                            {toggleMiniCardDetails && <MiniCardDynamicComponent
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