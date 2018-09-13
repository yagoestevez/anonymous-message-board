'use strict';

const BoardModel = require( '../Models/BoardModel' );

module.exports = class BoardController {

  constructor ( ) {
    this.boardModel = new BoardModel( );
  }

  async listBoards ( req ) {
    let boards = await this.boardModel.getAllBoards( );
    if ( !boards )
      throw { code: 404, text: `Sorry, there are no boards yet or something went wrong.` }; 
    boards = boards.map( b => b.name );
    return boards;
  }


};