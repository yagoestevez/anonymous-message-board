const chaiHttp  = require( 'chai-http' );
const chai      = require( 'chai' );
const expect    = chai.expect;
const server    = require( '../Main' );

chai.use( chaiHttp );

suite( 'Functional Tests', ( ) => {

  let firstThreadID  = '';
  let secondThreadID = '';
  let replyID        = '';

  suite( 'TESTING API FOR /api/threads/:board', ( ) => {

    suite( 'POST', ( ) => {
      test( 'Create one new thread on board "testboard"', done => {
        chai.request( server )
          .post( '/api/threads/testboard' )
          .send( {
            text            : 'This is a new test thread',
            delete_password : 'MyPass'
          } )
          .end( ( err,res ) => {
            expect( res.status ).to.equal( 200 );
            expect( res.text )
              .to.equal( 'Thread "This is a new test thread" has been successfully posted' );
            done( );
          } )
      } );
      test( 'Create another new thread on board "testboard"', done => {
        setTimeout( ( ) => {
          chai.request( server )
            .post( '/api/threads/testboard' )
            .send( {
              text            : 'This is a second test thread',
              delete_password : 'MyPass'
            } )
            .end( ( err,res ) => {
              expect( res.status ).to.equal( 200 );
              expect( res.text )
                .to.equal( 'Thread "This is a second test thread" has been successfully posted' );
              done( );
            } )
        }, 500 );
      } );
    } );
    
    suite( 'GET', ( ) => {
      test( 'List the 10 most recent threads with the 3 most recent replies', done => {
        chai.request( server )
          .get( '/api/threads/testboard' )
          .end( ( err,res ) => {
            secondThreadID = res.body[0]._id;
            firstThreadID  = res.body[1]._id;
            expect( res.status ).to.equal( 200 );
            expect( res.body, 'response should be an array' ).to.be.an( 'array' );
            expect( res.body.length, 'response array should have between 2 and 10 items' )
              .to.be.below( 11 ).to.be.above( 1 );
            expect( res.body[0], 'response should NOT have a property named "reported"')
              .to.not.have.property( 'reported' );
            expect( res.body[0], 'response should NOT have a property named "delete_password"')
              .to.not.have.property( 'delete_password' );
            expect( res.body[0], 'response should have a property named "_id"')
              .to.have.property( '_id' );
            expect( res.body[0], 'response should have a property named "text" to equal "This is a second test thread" ')
              .to.have.property( 'text' )
              .to.be.a( 'string' )
              .to.equal( 'This is a second test thread' );
            expect( res.body[0], 'response should have a property named "created_on"')
              .to.have.property( 'created_on' ).to.be.a( 'string' );
            expect( res.body[0], 'response should have a property named "bumped_on"')
              .to.have.property( 'bumped_on' ).to.be.a( 'string' );
            expect( res.body[0], 'response should have a property named "replies"')
              .to.have.property( 'replies' ).to.be.an( 'array' );
            done( );
          } )
      } );
    } );

    suite( 'DELETE', ( ) => {
      test( 'Delete the first thread using the CORRECT PASSWORD', done => {
        chai.request( server )
          .delete( '/api/threads/testboard' )
          .send( { thread_id: firstThreadID, delete_password: 'MyPass' } )
          .end( ( err,res ) => {
            expect( res.status ).to.equal( 200 );
            expect( res.text ).to.equal( 'success' );
            done( );
          } )
      } );
      test( 'Delete the first thread using an INCORRECT PASSWORD', done => {
        chai.request( server )
          .delete( '/api/threads/testboard' )
          .send( { thread_id: secondThreadID, delete_password: 'MyWrongPass' } )
          .end( ( err,res ) => {
            expect( res.status ).to.equal( 200 );
            expect( res.text ).to.equal( 'incorrect password' );
            done( );
          } )
      } );
    } );

    suite( 'PUT', ( ) => {
      test( 'Report a thread', done => {
        chai.request( server )
          .put( '/api/threads/testboard' )
          .send( { thread_id: secondThreadID } )
          .end( ( err,res ) => {
            expect( res.status ).to.equal( 200 );
            expect( res.text ).to.equal( 'success' );
            done( );
          } )
      } );
    } );

  } );

  suite( 'TESTING API FOR /api/replies/:board', ( ) => {

    suite( 'POST', done => {
      test( 'Post a reply to an existing thread', done => {
        chai.request( server )
          .post( '/api/replies/testboard' )
          .send( {
            thread_id       : secondThreadID,
            text            : 'This is a test reply',
            delete_password : 'MyPass'
          } )
          .end( ( err,res ) => {
            expect( res.status ).to.equal( 200 );
            expect( res.text )
              .to.equal( 'Reply "This is a test reply" successfully posted.' );
          } )
          done( );
      } );      
    } );

    suite( 'GET', done => {
      test( 'Get all replies for an existing thread', done => {
        setTimeout( ( ) => {
          chai.request( server )
            .get( '/api/replies/testboard' )
            .query( { thread_id: secondThreadID } )
            .end( ( err,res ) => {
              replyID = res.body.replies[0]._id;
              expect( res.status ).to.equal( 200 );
              expect( res.body, 'response should be an object' ).to.be.an( 'object' );
              expect( res.body, 'response should have a property named "_id"')
                .to.have.property( '_id' )
                .to.equal( secondThreadID );
              expect( res.body, 'response should have a property named "text" to equal "This is a second test thread"')
                .to.have.property( 'text' )
                .to.be.a( 'string' )
                .to.equal( 'This is a second test thread' );
              expect( res.body, 'response should have a property named "created_on"')
                .to.have.property( 'created_on' ).to.be.a( 'string' );
              expect( res.body, 'response should have a property named "bumped_on"')
                .to.have.property( 'bumped_on' ).to.be.a( 'string' );
              expect( res.body, 'response should NOT have a property named "reported"')
                .to.not.have.property( 'reported' );
              expect( res.body, 'response should NOT have a property named "delete_password"')
                .to.not.have.property( 'delete_password' );
              expect( res.body, 'response should have an array property named "replies"')
                .to.have.property( 'replies' ).to.be.an( 'array' );
              expect(
                res.body.replies[0],
                'response\'s 1st reply should NOT have a property named "reported"' )
                  .to.not.have.property( 'reported' );
              expect(
                res.body.replies[0],
                'response\'s 1st reply should NOT have a property named "delete_password"' )
                  .to.not.have.property( 'delete_password' );
              expect(
                res.body.replies[0],
                'response\'s 1st reply should have a property "text" to equal "This is a test reply"' )
                  .to.have.property( 'text' )
                  .to.equal( 'This is a test reply' );
              done( );
            } )
        }, 500 );
      } );      
    } );

    suite( 'PUT', ( ) => {
      test( 'Report a reply', done => {
        chai.request( server )
          .put( '/api/replies/testboard' )
          .send( { thread_id: secondThreadID, reply_id: replyID } )
          .end( ( err,res ) => {
            expect( res.status ).to.equal( 200 );
            expect( res.text ).to.equal( 'success' );
            done( );
          } )
      } );
    } );

    suite( 'DELETE', ( ) => {
      test( 'Delete a reply using an INCORRECT PASSWORD', done => {
        chai.request( server )
          .delete( '/api/replies/testboard' )
          .send( {
            thread_id       : secondThreadID,
            reply_id        : replyID,
            delete_password : 'MyWrongPass'
          } )
          .end( ( err,res ) => {
            expect( res.status ).to.equal( 200 );
            expect( res.text ).to.equal( 'incorrect password' );
            done( );
          } )
      } );
      test( 'Delete a reply using the CORRECT PASSWORD', done => {
        chai.request( server )
          .delete( '/api/replies/testboard' )
          .send( {
            thread_id       : secondThreadID,
            reply_id        : replyID,
            delete_password : 'MyPass'
          } )
          .end( ( err,res ) => {
            expect( res.status ).to.equal( 200 );
            expect( res.text ).to.equal( 'success' );
            done( );
          } )
      } );
    } );

  } );

  after( () => {
    console.log( '------------->   FINISH TESTING THE API   <-------------' );
  })

} );